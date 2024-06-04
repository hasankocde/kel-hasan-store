"use strict"
const { mongoose } = require('../configs/dbConnection')
const Favorite = require("../models/favorite.model");
const User = require("../models/user.model");
const sendMail = require('../helpers/sendMail')
const Follow = require("../models/follow.model"); 


// Ad Model:
const AdSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: false
        
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    content: {
        type: String,
        trim: true
    },
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: false
    },
    PLZ: {
        type: Number,
        required: true
    },
    Street: {
        type: String,
        trim: true,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    priceChanged: {
        type: Boolean,
        default: false
    },    
    images: {
        type: [String]
    },
    offerType: {
        type: Boolean,
        required: false
    },
    isPublish: {
        type: Boolean,
        default: false
    },
    countOfVisitors: {
        type: Number
        
    },
    expireDate: {
        type: Date
    },
    isSold: {
        type: Boolean,
        default: false
    },
    soldUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    soldDate: {
        type: Date
    },
    isReserved: {
        type: Boolean,
        default: false
    },
    reservedUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reservedDate: {
        type: Date
    },
    visitedUser: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    future: {
        type: String
    }
}, { collection: 'ads', timestamps: true });

// Pre-save hooks to set dates automatically and clear userId fields
AdSchema.pre('save', function(next) {

     // Check if both isSold and isReserved are true
     if (this.isSold && this.isReserved) {
        return next(new Error('An ad cannot be both sold and reserved at the same time.'));
    }


    if (this.isModified('isSold') && !this.isSold) {
        this.soldUserId = undefined;
        this.soldDate = undefined;
    }

    if (this.isModified('isReserved') && !this.isReserved) {
        this.reservedUserId = undefined;
        this.reservedDate = undefined;
    }

    next();
});


AdSchema.pre('findOneAndUpdate', async function(next) {
    const originalDoc = await this.model.findOne(this.getQuery()).exec();
    
    if (originalDoc) {
        // İlk önce favorilere eklenmiş mi kontrol et
        const isFavorited = await Favorite.findOne({ adId: originalDoc._id });
        
        // Eğer ilan favorilere eklenmişse ve fiyat değişikliği varsa işlem yap
        if (isFavorited && 'price' in this._update && this._update.price !== originalDoc.price) {
            this._update.$set = this._update.$set || {};
            this._update.$set.priceChanged = true;
        }
    }
    
    next();
});


AdSchema.post('findOneAndUpdate', async function(doc) {
    if (doc && this._update.$set && this._update.$set.priceChanged) {
        const adId = doc._id;
        // Favorilere eklenmiş kullanıcıları bul
        const favorites = await Favorite.find({ adId: adId });
        for (const favorite of favorites) {
            // Her kullanıcı için e-posta gönder
            const user = await User.findById(favorite.userId);
            if (user && user.email) {
                sendMail(user.email, 'Fiyat Düstü!', 'The price of an ad you favorited has dropped!');
            }
        }
    }
});

AdSchema.post('save', async function(doc) {
    if (doc) {
      const creationTime = new Date(doc.createdAt).getTime();
      const updateTime = new Date(doc.updatedAt).getTime();
  
      // İlanın oluşturulma ve güncellenme zamanı 1 dakikadan az bir farkla ise, yeni ilan olarak kabul edilir. bu yüzden ilanın süresi 1 dakikadan az olmalıdır. az olmazsa yukardaki kodlar devreye giriyor ve bu ilanda yapilan fiyat güncellemesi takipciye eni ürün eklendi email inini gönderiyor ki bu cok sacma olur
      if (updateTime - creationTime < 60 * 1000) {
        const ownerId = doc.ownerId;
  
        // Find all followers of the ad owner
        const followers = await Follow.find({ followedUserId: ownerId });
  
        for (const follower of followers) {
          const user = await User.findById(follower.userId);
  
          if (user && user.email) {
            sendMail(user.email, 'Yeni ürün eklendi!', `A user you follow has posted a new ad: ${doc.title}`);
          }
        }
      }
    }
  });
  






module.exports = mongoose.model('Ad', AdSchema)



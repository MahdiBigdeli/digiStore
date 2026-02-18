// پایگاه داده محصولات
const allProducts = {
    'موبایل': [
        { 
            name: 'گوشی موبایل اپل iPhone 17 Pro Max', 
            price: '۳۱۹,۹۹۰,۰۰۰', 
            oldPrice: '۳۵۰,۰۰۰,۰۰۰',
            image: 'images/phone 17 promax.webp', 
            rating: '⭐⭐⭐⭐⭐', 
            reviews: '۱۲۳',
            discount: '۱۰٪'
        },
        { 
            name: 'گوشی موبایل سامسونگ Galaxy S24 Ultra', 
            price: '۴۵,۰۰۰,۰۰۰', 
            oldPrice: '۵۰,۰۰۰,۰۰۰',
            image: 'images/phone 17 promax.webp', 
            rating: '⭐⭐⭐⭐⭐', 
            reviews: '۹۸',
            discount: '۱۰٪'
        },
        { 
            name: 'گوشی موبایل شیائومی Redmi Note 13', 
            price: '۸,۵۰۰,۰۰۰', 
            oldPrice: '۱۰,۰۰۰,۰۰۰',
            image: 'images/phone 17 promax.webp', 
            rating: '⭐⭐⭐⭐', 
            reviews: '۱۵۶',
            discount: '۱۵٪'
        },
        { 
            name: 'گوشی موبایل اپل iPhone 15 Pro', 
            price: '۶۵,۰۰۰,۰۰۰', 
            oldPrice: '۷۵,۰۰۰,۰۰۰',
            image: 'images/phone 17 promax.webp', 
            rating: '⭐⭐⭐⭐⭐', 
            reviews: '۲۳۴',
            discount: '۱۳٪'
        }
    ],
    'لپ تاپ': [
        { 
            name: 'لپ تاپ ایسوس Vivobook 15', 
            price: '۳۰,۰۰۰,۰۰۰', 
            oldPrice: '۳۵,۰۰۰,۰۰۰',
            image: 'images/laptop asus.webp', 
            rating: '⭐⭐⭐⭐', 
            reviews: '۸۷',
            discount: '۱۴٪'
        },
        { 
            name: 'لپ تاپ اپل MacBook Pro 14', 
            price: '۱۲۰,۰۰۰,۰۰۰', 
            oldPrice: '۱۳۵,۰۰۰,۰۰۰',
            image: 'images/laptop asus.webp', 
            rating: '⭐⭐⭐⭐⭐', 
            reviews: '۲۱۵',
            discount: '۱۱٪'
        },
        { 
            name: 'لپ تاپ لنوو IdeaPad Gaming', 
            price: '۴۵,۰۰۰,۰۰۰', 
            oldPrice: '۵۲,۰۰۰,۰۰۰',
            image: 'images/laptop asus.webp', 
            rating: '⭐⭐⭐⭐', 
            reviews: '۱۴۳',
            discount: '۱۳٪'
        },
        { 
            name: 'لپ تاپ ایسر Aspire 5', 
            price: '۲۵,۰۰۰,۰۰۰', 
            oldPrice: '۲۸,۰۰۰,۰۰۰',
            image: 'images/laptop asus.webp', 
            rating: '⭐⭐⭐⭐', 
            reviews: '۱۶۷',
            discount: '۱۱٪'
        }
    ],
    'لوازم جانبی': [
        { 
            name: 'هدست ریزر BLACKSHARK V2', 
            price: '۱,۸۰۰,۰۰۰', 
            oldPrice: '۲,۵۰۰,۰۰۰',
            image: 'images/hedset.webp', 
            rating: '⭐⭐⭐⭐⭐', 
            reviews: '۲۱۵',
            discount: '۲۸٪'
        },
        { 
            name: 'ماوس تسکو TM 295', 
            price: '۹۵۰,۰۰۰', 
            oldPrice: '۱,۲۰۰,۰۰۰',
            image: 'images/mos.webp', 
            rating: '⭐⭐⭐⭐⭐', 
            reviews: '۲۸۹',
            discount: '۲۱٪'
        },
        { 
            name: '  فنر تقویت مچ گلدن استار مدل GS-16A  ', 
            price: '۳,۵۰۰,۰۰۰', 
            oldPrice: '۴,۲۰۰,۰۰۰',
            image: 'images/joneb1.webp', 
            rating: '⭐⭐⭐⭐', 
            reviews: '۱۷۸',
            discount: '۱۷٪'
        },
        { 
            name: ' دستگاه جوش 350 آمپر ماکیسل مدل SMART 350  ', 
            price: '۲,۸۰۰,۰۰۰', 
            oldPrice: '۳,۵۰۰,۰۰۰',
            image: 'images/janeb2.webp', 
            rating: '⭐⭐⭐⭐⭐', 
            reviews: '۳۴۵',
            discount: '۲۰٪'
        },
        { 
            name: ' دستگاه کشش عضلات همسترینگ اودسا مدل M1 ', 
            price: '۱,۹۵۰,۰۰۰', 
            oldPrice: '۲,۴۰۰,۰۰۰',
            image: 'images/janeb3.webp', 
            rating: '⭐⭐⭐⭐', 
            reviews: '۲۶۷',
            discount: '۱۹٪'
        }
    ],
    'دوربین': [
        { 
            name: 'دوربین فیلم برداری 70maI', 
            price: '۱۸,۰۰۰,۰۰۰', 
            oldPrice: '۲۲,۰۰۰,۰۰۰',
            image: 'images/camera.webp', 
            rating: '⭐⭐⭐⭐', 
            reviews: '۹۸',
            discount: '۱۸٪'
        },
        { 
            name: 'دوربین کانن EOS R6', 
            price: '۱۵۰,۰۰۰,۰۰۰', 
            oldPrice: '۱۷۰,۰۰۰,۰۰۰',
            image: 'images/camera.webp', 
            rating: '⭐⭐⭐⭐⭐', 
            reviews: '۱۲۴',
            discount: '۱۲٪'
        },
        { 
            name: 'دوربین سونی A7 IV', 
            price: '۱۸۰,۰۰۰,۰۰۰', 
            oldPrice: '۲۰۰,۰۰۰,۰۰۰',
            image: 'images/camera.webp', 
            rating: '⭐⭐⭐⭐⭐', 
            reviews: '۱۵۶',
            discount: '۱۰٪'
        },
        { 
            name: 'دوربین نیکون Z6 II', 
            price: '۱۴۵,۰۰۰,۰۰۰', 
            oldPrice: '۱۶۵,۰۰۰,۰۰۰',
            image: 'images/camera.webp', 
            rating: '⭐⭐⭐⭐', 
            reviews: '۸۹',
            discount: '۱۲٪'
        }
    ],
    'گیمینگ': [
        { 
            name: 'کنسول بازی سونی PlayStation 5 Pro', 
            price: '۱۳۱,۵۰۰,۰۰۰', 
            oldPrice: '۱۵۰,۰۰۰,۰۰۰',
            image: 'images/pes5.webp', 
            rating: '⭐⭐⭐⭐⭐', 
            reviews: '۴۵۶',
            discount: '۱۲٪'
        },
        { 
            name: 'کنسول Xbox Series X', 
            price: '۸۵,۰۰۰,۰۰۰', 
            oldPrice: '۹۵,۰۰۰,۰۰۰',
            image: 'images/pes5.webp', 
            rating: '⭐⭐⭐⭐⭐', 
            reviews: '۳۲۱',
            discount: '۱۱٪'
        },
        { 
            name: 'دسته بازی DualSense', 
            price: '۴,۵۰۰,۰۰۰', 
            oldPrice: '۵,۲۰۰,۰۰۰',
            image: 'images/pes5.webp', 
            rating: '⭐⭐⭐⭐', 
            reviews: '۲۶۷',
            discount: '۱۳٪'
        },
        { 
            name: 'صندلی گیمینگ ریزر', 
            price: '۱۸,۰۰۰,۰۰۰', 
            oldPrice: '۲۲,۰۰۰,۰۰۰',
            image: 'images/pes5.webp', 
            rating: '⭐⭐⭐⭐⭐', 
            reviews: '۱۹۸',
            discount: '۱۸٪'
        }
    ],
    'ساعت هوشمند': [
        { 
            name: 'ساعت هوشمند سامسونگ Galaxy Watch 7', 
            price: '۸,۵۰۰,۰۰۰', 
            oldPrice: '۱۰,۰۰۰,۰۰۰',
            image: 'images/appelwatch.webp', 
            rating: '⭐⭐⭐⭐⭐', 
            reviews: '۳۴۲',
            discount: '۱۵٪'
        },
        { 
            name: 'ساعت هوشمند اپل Watch Series 9', 
            price: '۲۵,۰۰۰,۰۰۰', 
            oldPrice: '۲۸,۰۰۰,۰۰۰',
            image: 'images/appelwatch.webp', 
            rating: '⭐⭐⭐⭐⭐', 
            reviews: '۴۸۹',
            discount: '۱۱٪'
        },
        { 
            name: 'ساعت هوشمند شیائومی Mi Band 8', 
            price: '۱,۲۰۰,۰۰۰', 
            oldPrice: '۱,۵۰۰,۰۰۰',
            image: 'images/appelwatch.webp', 
            rating: '⭐⭐⭐⭐', 
            reviews: '۵۶۷',
            discount: '۲۰٪'
        },
        { 
            name: 'ساعت هوشمند هواوی Watch GT 4', 
            price: '۶,۵۰۰,۰۰۰', 
            oldPrice: '۷,۸۰۰,۰۰۰',
            image: 'images/appelwatch.webp', 
            rating: '⭐⭐⭐⭐', 
            reviews: '۲۳۴',
            discount: '۱۷٪'
        }
    ],
    'لوازم خانگی': [
        { 
            name: 'جاروبرقی رباتی شیائومی', 
            price: '۱۲,۰۰۰,۰۰۰', 
            oldPrice: '۱۵,۰۰۰,۰۰۰',
            image: 'images/memory.webp', 
            rating: '⭐⭐⭐⭐', 
            reviews: '۱۸۹',
            discount: '۲۰٪'
        },
        { 
            name: 'یخچال فریزر سامسونگ', 
            price: '۴۵,۰۰۰,۰۰۰', 
            oldPrice: '۵۲,۰۰۰,۰۰۰',
            image: 'images/memory.webp', 
            rating: '⭐⭐⭐⭐⭐', 
            reviews: '۲۳۴',
            discount: '۱۳٪'
        },
        { 
            name: 'ماشین لباسشویی ال جی', 
            price: '۳۵,۰۰۰,۰۰۰', 
            oldPrice: '۴۰,۰۰۰,۰۰۰',
            image: 'images/memory.webp', 
            rating: '⭐⭐⭐⭐', 
            reviews: '۱۷۶',
            discount: '۱۳٪'
        },
        { 
            name: 'مایکروویو پاناسونیک', 
            price: '۸,۵۰۰,۰۰۰', 
            oldPrice: '۱۰,۰۰۰,۰۰۰',
            image: 'images/memory.webp', 
            rating: '⭐⭐⭐⭐', 
            reviews: '۱۴۵',
            discount: '۱۵٪'
        }
    ],
    'پوشاک': [
        { 
            name: 'تیشرت ورزشی نایک', 
            price: '۱,۵۰۰,۰۰۰', 
            oldPrice: '۲,۰۰۰,۰۰۰',
            image: 'images/memory.webp', 
            rating: '⭐⭐⭐⭐', 
            reviews: '۳۴۵',
            discount: '۲۵٪'
        },
        { 
            name: 'کفش کتانی آدیداس', 
            price: '۴,۵۰۰,۰۰۰', 
            oldPrice: '۵,۵۰۰,۰۰۰',
            image: 'images/memory.webp', 
            rating: '⭐⭐⭐⭐⭐', 
            reviews: '۴۲۳',
            discount: '۱۸٪'
        },
        { 
            name: 'کرم مرطوب کننده پوست', 
            price: '۶۸۰,۰۰۰', 
            oldPrice: '۸۵۰,۰۰۰',
            image: 'images/KREM1.webp', 
            rating: '⭐⭐⭐⭐⭐', 
            reviews: '۵۶۷',
            discount: '۲۰٪'
        },
        { 
            name: 'شمش طلا', 
            price: '۱۵,۰۰۰,۰۰۰', 
            oldPrice: '۱۸,۰۰۰,۰۰۰',
            image: 'images/tala1.webp', 
            rating: '⭐⭐⭐⭐⭐', 
            reviews: '۲۸۹',
            discount: '۱۷٪'
        }
    ]
};

// آیکون های دستهبندی
const categoryIcons = {
    'موبایل': '📱',
    'لپ تاپ': '💻',
    'لوازم جانبی': '🎧',
    'دوربین': '📷',
    'گیمینگ': '🎮',
    'ساعت هوشمند': '⌚',
    'لوازم خانگی': '🏠',
    'پوشاک': '👕'
};

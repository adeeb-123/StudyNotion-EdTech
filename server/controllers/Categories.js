const Category = require("../models/Category");
const Course = require("../models/Course");
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}
// createTag 
exports.createCategory = async(req , res) => {
    try{
                // fetch data 
              const {name , description} = req.body;
                 //validation
              if(!name || !description){
                return res.status(400).json({
                    success:false,
                    message:"All fields are Required"
                });
              }
                 //create entry in DB
              const categoryDetails = await Category.create({
                name:name,
                description:description
              });
              console.log("Category details are : " , categoryDetails);
                //return res
              return res.status(200).json({
                success:true,
                message:"Category Created Successfully"
              });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};


// getAllTags 
exports.getAllCategories =  async(req, res) => {
    try{
        const allCategories = await Category.find({} , {name:true , description:true});

           //return res
           return res.status(200).json({
            success:true,
            message:"Tag Created Successfully",
            allCategories,
          });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};

//category Page details
exports.categoryPageDetails = async (req ,res) => {
  try{
      const categoryId = req.body.categoryId;
      console.log("PRINTING CATEGORY ID - " , categoryId);

      const selectedCategory = await Category.findById(categoryId)
      .populate({
        path:"courses",
        match: {status : "Published"},
        populate:"ratingAndReviews"
      })
      .exec();

      if(!selectedCategory){
        return res.status(404).json({success:false , message:"Category Not found"})
      }

      if(selectedCategory.courses.length === 0){
        console.log("No courses found for this selected Category")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }

      const categoriesExceptSelected = await Category.find({
        _id:{$ne:categoryId}
      })
      // console.log("categoriesExceptSelected - " , categoriesExceptSelected)
      let differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
      )
      .populate({
        path:"courses",
        match: {status:"Published"},
      })
      .exec();

    //  console.log("differentCategory -  ",differentCategory)
      //get top selling courses
      const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        })
        .exec()

        // console.log(" allCategories - ",  allCategories )
      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
      .sort((a,b) => b.sold - a.sold)
      .slice(0,10)
      // console.log("mostSellingCourses - " , mostSellingCourses)

      res.status(200).json({
        success:true,
        data:{
          selectedCategory,
          differentCategory,
          mostSellingCourses
        }
      });
  }catch(error){
    return res.status(500).json({
      success:false,
      message:error.message,
  });
  }
}
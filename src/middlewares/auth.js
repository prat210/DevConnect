const adminAuth = (req,res,next)=>{
    const token = "xyz";
    const isAdminAutho = token ==="xyz";
    console.log("This will always get checked");
    if (!isAdminAutho){
     res.status(401).send("Admin Unauthorized");
    }
    else{
     next();
    }
}
    const UserAuth = (req,res,next)=>{
        const token = "xyz";
        const isAdminAutho = token ==="xyz";
        console.log("This will always get checked");
        if (!isAdminAutho){
         res.status(401).send("User Unauthorized");
        }
        else{
         next();
        }
 // next();
 
 }
 module.exports = {
    adminAuth,UserAuth,
 }
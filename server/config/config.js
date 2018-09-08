module.exports = {
  port: process.env.PORT || 8080,
  db:{
    port: '',
    password: ''
  },


  auth: {

    jwtSecret: process.env.JWT_SECRET || "",
    jwtFindBy: "",
    google:{

      googleID: "id_goes_here",
      googleSecret: "id_goes_here",
      
    }


  }
}
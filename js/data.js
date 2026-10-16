// DATA: the lists of services, barbers, and time slots.
// Edit these lists to change what the website shows.

const services = [
  {id:1, name:"Classic Haircut", cat:"Men",   price:120, mins:30, desc:"Clean cut with scissors or clippers."},
  {id:2, name:"Fade Cut",        cat:"Men",   price:150, mins:45, desc:"Low, mid, or high fade."},
  {id:3, name:"Haircut + Wash",  cat:"Men",   price:180, mins:45, desc:"Cut with shampoo and blow dry."},
  {id:4, name:"Ladies' Trim",    cat:"Women", price:200, mins:40, desc:"Light trim to keep your length neat."},
  {id:5, name:"Layered Cut",     cat:"Women", price:350, mins:60, desc:"Layers styled to your face shape."},
  {id:6, name:"Kids Haircut",    cat:"Kids",  price:100, mins:30, desc:"For ages 12 and below."},
  {id:7, name:"Beard Trim",      cat:"Beard", price:80,  mins:20, desc:"Shape and line-up."},
  {id:8, name:"Hot Towel Shave", cat:"Beard", price:130, mins:30, desc:"Smooth shave with hot towel finish."}
];

const barbers = [
  {id:1, name:"Lebron James",   spec:"Fades and classic cuts",photo:"images/lebron.png"},
  {id:2, name:"Jaylen Brown",   spec:"Women's cuts and layers",photo:"images/jb.png"},
  {id:3, name:"Joel Embiid",  spec:"Kids and beard care",photo:"images/joel.jpg"},
  {id:4, name:"Tyrese Maxey", spec:"All-around stylist",photo:"images/ty.png"}
];

const times = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
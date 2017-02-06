# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Product.destroy_all

Product.create!([{
  name: "Fender Stratocaster",
  quantity: 20,
  price: 1000
},
{
  name: "Fender Telecaster",
  quantity: 30,
  price: 1200
},
{
  name: "Fender Jaguar",
  quantity: 15,
  price: 1500
},
{
  name: "Fender Jazzmaster",
  quantity: 5,
  price: 2500
},
{
  name: "Gibson Les Paul",
  quantity: 10,
  price: 3450
},
{
  name: "Gibson SG",
  quantity: 15,
  price: 2300
},
{
  name: "Squier Affinity",
  quantity: 45,
  price: 700
}])

p "Created #{Product.count} products"
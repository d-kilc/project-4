puts 'Planting users...'
dan = User.create username: "dan", password: "test"
freddy = User.create username: "freddy", password: "test12"
puts 'Done planting users.'

puts 'Planting items...'
mac = Item.create name: "Macbook Pro", original_cost: 1500, brand: "Apple", year_manufactured: 2020, description: "laptop"
ski_pass = Item.create name: "Ski rentals and lift ticket", original_cost: 120, brand: "Devil's Head Resort", year_manufactured: 2022, description: "skiing"
puts 'Done planting items.'

puts 'Planting user items...'
UserItem.create notes: "bought in summer 2020", user_id: dan.id, item_id: mac.id, usage_frequency: 500, item_type: "Frequency"
UserItem.create notes: "skiing on 2/26", user_id: dan.id, item_id: ski_pass.id, usage_frequency: 25, item_type: "Frequency"
puts 'Done planting user items items.'

puts 'Planting data...'
dan = User.create username: "dan", password: "test"
freddy = User.create username: "freddy", password: "test"

50.times do
    name = Faker::Name.unique.first_name.downcase
    User.create username: name, password: 'test'

    5.times do
        product_name = Faker::Commerce.product_name
        price = Faker::Commerce.price
        brand = Faker::Commerce.brand
        desc = Faker::Commerce.material
        Item.create name: product_name, original_cost: price, brand: brand, year_manufactured: 2018, description: desc
    end

end

User.all.each do |user|
    3.times do
        notes = Faker::Quote.famous_last_words
        usage_frequency = rand 1..100
        item = Item.find(rand 1..250)

        user_item = UserItem.create notes: notes, item_type: "Frequency", usage_frequency: usage_frequency, item: item, user: user
    end
end

puts 'Done planting data.'

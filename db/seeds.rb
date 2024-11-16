# Seed the database...
require "faker"
Faker::Config.random = Random.new(42)
# Clear it all...
JournalCategory.destroy_all
Category.destroy_all
JournalEntry.destroy_all
Subtask.destroy_all
Task.destroy_all
User.destroy_all

# Now seed it!
puts "Seeding Database..."

# cats = []

users = []

days = [
  "monday",
  "tuseday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]

users << User.create(
  email: "pauldevanney92@gmail.com",
  password: "devanney",
  username: "HarryD",
  first_name: "Paul",
  last_name: "Devanney",
  admin: false,
  image_url: "https://d26jy9fbi4q9wx.cloudfront.net/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBd0ErQXc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--2d5e88acd264501b52d1a84625c82aeba643b99e/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RTNKbGMybDZaVjkwYjE5bWFXeHNXd2hwQWNocEFjaDdCam9KWTNKdmNEb09ZWFIwWlc1MGFXOXUiLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--b67d9ded4d28d0969fbb98b4c21b79257705a99a/20240805_234634.jpg",
  bio: "In my last job I was a QA at an industrial bakery which supplied baked goods to most of the big supermarkets in the UK. It wasn't a bad job but its not what I wanted to do. I, obviously, want to get into Web Development or similar role. I have been in to coding, on and off, for quite a few years now. However, I didn't go to Uni nor do I have any industry recognised certification which meant I couldn't get passed the 'Recruitment Agencies'! So, I'm hoping this bootcamp can remedy that although, If I succeed on this bootcamp the freelance route could be a better option. I was a little apprehensive about applying for this course, initially, as I've practically no experience with the Ruby Programming language but quickly realised it would be a worth while challenge and learning experience.",
)

users << User.create(
  email: "jondriveuk@gmail.com",
  password: "password",
  username: "jon",
  first_name: "jon",
  last_name: "hollingsworth",
  admin: false,
  image_url: "https://d26jy9fbi4q9wx.cloudfront.net/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBLzFKQXc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--f8872b71011e210ae17fc973906c1e365fa78db0/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RTNKbGMybDZaVjkwYjE5bWFXeHNXd2hwQWNocEFjaDdCam9KWTNKdmNEb09ZWFIwWlc1MGFXOXUiLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--df4f7d63fe19fb30952f52eed6dffc392a97578c/MEZOOM.png",
  bio: "Spent the last 5 years selling on Etsy, Amazon & ebay ",
)

users << User.create(
  email: "rehyan92@gmail.com",
  password: "Rehyan",
  username: "Rehyan",
  first_name: "Rehyan",
  last_name: "Rhoden",
  admin: false,
  image_url: "https://d26jy9fbi4q9wx.cloudfront.net/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMFo0QXc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--b438ec06c005cb9215b3125338bc5a7055c6e8be/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lKYW5CbFp3WTZCa1ZVT2hOeVpYTnBlbVZmZEc5ZlptbHNiRnNJYVFISWFRSElld1k2Q1dOeWIzQTZEbUYwZEdWdWRHbHZiZz09IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--23cdbdf9871e44adeb4d843a03b0793a5f08394b/IMG_4770.jpeg",
  bio: "I want to further develop my knowledge of front-end and immerse myself in to back end web development. I would love to be a freelance developer working on projects for clients in a diverse creative way.",
)

# Try get better data (English as opposed to 'Lorem Ipsum')
# Make a specific number of Tasks say, 3-5 AM Routine,
# 7-10 Core-Day and 1-3 PM Routine
these_days = {
  "monday" => "1",
  "tuseday" => "1",
  "wednesday" => "1",
  "thursday" => "1",
  "friday" => "1",
  "saturday" => "1",
  "sunday" => "1",
}

# Make some routine tasks
users.each_with_index do |user, i|
  start_date = Date.tomorrow

  # Cold Shower (Stoic Discipline)
  task = Task.new(
    routine: "morning",
    recurs_on: these_days,
    task_type: "stoic_discipline",
    title: "Cold Shower",
    description: "A quick shower to get your body ready for the day.",
    start_date: Time.parse("#{start_date} 06:00"),
  )
  task.user = user
  task.save!

  # Kettlebell Workout (Fitness)
  task = Task.new(
    routine: "morning",
    recurs_on: these_days,
    task_type: "fitness",
    title: "Kettlebell Workout",
    start_date: Time.parse("#{start_date} 06:15"),
  )
  task.user = user
  task.save!
  [
    "Hand 2 Hand Swings - 5x15 Reps",
    "One Handed Cleans - 5x10 Reps",
    "Full Snatch - 5x20 Reps",
  ]
    .each_with_index do |exercise, i|
    subtask = Subtask.new(
      title: exercise,
      description: Faker::Lorem.paragraph(sentence_count: rand(2..3)),
    )
    subtask.task = task
    subtask.save!
  end

  # Meditate (Spiritual Development)
  task = Task.new(
    routine: "morning",
    recurs_on: these_days,
    task_type: "spiritual",
    title: "Meditate",
    description: "Meditate for approx. 20-30 minutes every morning!",
    start_date: Time.parse("#{start_date} 07:00"),
  )
  task.user = user
  task.save!
  [
    "Find a calm and quiet place.",
    "Make yourself comfortable.",
    "Now, empty your mind!!!",
  ]
    .each_with_index do |step, i|
    subtask = Subtask.new(
      title: step,
    )
    subtask.task = task
    subtask.save!
  end

  # Evening Routine - Stoic Exercise (Review the Day)
  # Reset the 'order' to 1 (as it's a new Routine type)
  task = Task.new(
    routine: "evening",
    recurs_on: these_days,
    task_type: "stoic_exercise",
    title: "Review the Day",
    description: "Review the day and reflect on what you did well and what you could have done better.",
    start_date: Time.parse("#{start_date} 21:30"),
  )
  task.user = user
  task.save!
  [
    "Mentally review the day three times from beginning to end.",
    "What mistakes did you make today?",
    "What virtue, that is, what strength or wisdom did you show today?",
    "What have you omitted or what could have been done better?",
    "Gratitude - What are you grateful for today?",
  ]
    .each_with_index do |step, i|
    subtask = Subtask.new(
      title: step,
    )
    subtask.task = task
    subtask.save!
  end
end

# Create some non-routine tasks - actual core-day tasks
15.times do
  start_date = Date.tomorrow
  these_days = Hash[days.map { |day| [day, "0"] }]
  routine = Task::NONE_ROUTINE_NAME.to_s

  # Randomise the start time
  start_time = rand(8..18)
  start_date = start_time.digits.count == 1 ? Time.parse("#{start_date} 0#{start_time}:00") : Time.parse("#{start_date} #{start_time}:00")
  task = Task.new(
    routine: routine,
    recurs_on: these_days,
    task_type: Task.task_types.keys[rand(0..(Task.task_types.length - 1))],
    title: Faker::Hobby.activity,
    description: Faker::Quote.famous_last_words + " " + Faker::Lorem.paragraph(sentence_count: rand(15..30)),
    comment: Faker::Quote.famous_last_words,
    start_date: start_date,
  )
  task.user = users.sample
  task.save!
  # Add subtasks
  rand(2..3).times do
    subtask = Subtask.new(
      title: Faker::Hobby.activity,
      description: Faker::Lorem.paragraph(sentence_count: rand(15..30)),
      comment: Faker::Quote.famous_last_words,
    )
    subtask.task = task
    subtask.save!
  end
end

# # Categories...
# 15.times do
#   cats << Category.create(category: Faker::Lorem.words(number: rand(1..2)).join("-"))
# end

# # Journal Entries...
# 15.times do
#   user = users.sample

#   je = JournalEntry.new(
#     title: Faker::Hobby.activity,
#     entry: Faker::Quote.famous_last_words,
#   )

#   je.user = user

#   # Add some categories...
#   # This breaks the seed file on occaision!!!
#   rand(1..7).times do
#     cat = cats.sample

#     jc = JournalCategory.new(journal_entry: je, category: cat)

#     if !jc.valid?
#       # p jc.errors, je, jc, cat
#     else
#       jc.save!
#     end
#   end

#   if !je.persisted?
#     if je.valid?
#       je.save!
#     else
#       p je.errors
#     end
#   end
# end
puts "...seeding Database Complete!"

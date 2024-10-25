# Seed the database...
#
require 'faker'
JournalCategory.destroy_all
Category.destroy_all
JournalEntry.destroy_all
Subtask.destroy_all
Task.destroy_all
User.destroy_all

Faker::Config.random = Random.new(42)

cats = []
users = []
one_in_three = [ true, false, false ]
days = [ 'monday', 'tuseday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday' ]

users << User.create(
  email: "pauldevanney92@gmail.com",
  password: "devanney",
  username: "HarryD",
  first_name: "Paul",
  last_name: "Devanney",
  admin: true,
  image_url: "https://d26jy9fbi4q9wx.cloudfront.net/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBd0ErQXc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--2d5e88acd264501b52d1a84625c82aeba643b99e/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RTNKbGMybDZaVjkwYjE5bWFXeHNXd2hwQWNocEFjaDdCam9KWTNKdmNEb09ZWFIwWlc1MGFXOXUiLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--b67d9ded4d28d0969fbb98b4c21b79257705a99a/20240805_234634.jpg",
  bio: "In my last job I was a QA at an industrial bakery which supplied baked goods to most of the big supermarkets in the UK. It wasn't a bad job but its not what I wanted to do. I, obviously, want to get into Web Development or similar role. I have been in to coding, on and off, for quite a few years now. However, I didn't go to Uni nor do I have any industry recognised certification which meant I couldn't get passed the 'Recruitment Agencies'! So, I'm hoping this bootcamp can remedy that although, If I succeed on this bootcamp the freelance route could be a better option. I was a little apprehensive about applying for this course, initially, as I've practically no experience with the Ruby Programming language but quickly realised it would be a worth while challenge and learning experience."
)

users << User.create(
  email: "jondriveuk@gmail.com",
  password: "password",
  username: "jon",
  first_name: "jon",
  last_name: "hollingsworth",
  admin: true,
  image_url: "https://d26jy9fbi4q9wx.cloudfront.net/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBLzFKQXc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--f8872b71011e210ae17fc973906c1e365fa78db0/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RTNKbGMybDZaVjkwYjE5bWFXeHNXd2hwQWNocEFjaDdCam9KWTNKdmNEb09ZWFIwWlc1MGFXOXUiLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--df4f7d63fe19fb30952f52eed6dffc392a97578c/MEZOOM.png",
  bio: "Spent the last 5 years selling on Etsy, Amazon & ebay "
)

users << User.create(
  email: "rehyan92@gmail.com",
  password: "Rehyan",
  username: "Rehyan",
  first_name: "Rehyan",
  last_name: "Rhoden",
  admin: true,
  image_url: "https://d26jy9fbi4q9wx.cloudfront.net/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMFo0QXc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--b438ec06c005cb9215b3125338bc5a7055c6e8be/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lKYW5CbFp3WTZCa1ZVT2hOeVpYTnBlbVZmZEc5ZlptbHNiRnNJYVFISWFRSElld1k2Q1dOeWIzQTZEbUYwZEdWdWRHbHZiZz09IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--23cdbdf9871e44adeb4d843a03b0793a5f08394b/IMG_4770.jpeg",
  bio: "I want to further develop my knowledge of front-end and immerse myself in to back end web development. I would love to be a freelance developer working on projects for clients in a diverse creative way."
)

# Try get better data (English as opposed to Latin)
# Make a specific number of Tasks say, 3-5 AM Routine,
# 7-10 Core-Day and 1-3 PM Routine
these_days = { 'monday' => true, 'tuseday' => true, 'wednesday' => true, 'thursday' => true, 'friday' => true, 'saturday' => true, 'sunday' => true }

users.each_with_index do |user, i|

  start_date = Date.today + rand(1..3)
  due_date = start_date

  task = Task.new(
    order: i + 1,
    routine: 'morning',
    recurs_on: these_days,
    active: true,
    task_type: 'self_development',
    title: 'Cold Shower',
    description: '',
    comment: '',
    start_date: start_date,
    due_date: due_date,
    completed: false
  )
  task.user = user
  task.save!
  task = Task.new(
    order: i + 2,
    routine: 'morning',
    recurs_on: these_days,
    active: true,
    task_type: 'self_development',
    title: 'Kettlebell Workout',
    description: '',
    comment: '',
    start_date: start_date,
    due_date: due_date,
    completed: false
  )
  task.user = user
  task.save!
  ['Hand 2 Hand Swings - 5x15 Reps', 'One Handed Cleans - 5x10 Reps', 'Full Snatch - 5x20 Reps'].each_with_index do |exercise, i|
    subtask = Subtask.new(
      order: i + 1,
      title: exercise,
      description: Faker::Lorem.paragraph(sentence_count: rand(2..3)),
      comment: '',
      start_date: start_date,
      due_date: due_date,
      completed: false,
    )
    subtask.task = task
    subtask.save!
  end
  task = Task.new(
    order: i + 3,
    routine: 'morning',
    recurs_on: these_days,
    active: true,
    task_type: 'self_development',
    title: 'Meditate',
    description: 'Meditate for approx. 20-30 minutes every morning!',
    comment: '',
    start_date: start_date,
    due_date: due_date,
    completed: false
  )
  task.user = user
  task.save!
  ['Find a calm and quiet place.',
    'Make yourself comfortable.',
    'Now, empty your mind!!!'].each_with_index do |step, i|
    subtask = Subtask.new(
      order: i + 1,
      title: step,
      description: '',
      comment: '',
      start_date: start_date,
      due_date: due_date,
      completed: false,
    )
    subtask.task = task
    subtask.save!
  end

end

i = 0
10.times do
i += 1
  start_date = Date.today + rand(1..3)
  due_date = start_date

  # routine = Task.routines.keys[rand(0..(Task.routines.length - 1))]
  # if routine != Task::NONE_ROUTINE_NAME.to_s
  #   these_days = Hash[days.map { |day| [day, one_in_three.sample] }]
  # else
  #   these_days = Hash[days.map { |day| [day, false] }]
  # end

  routine = 'not_recuring'

  task = Task.new(
    order: i + 1,
    routine: routine,
    recurs_on: these_days,
    active: true,
    task_type: Task.task_types.keys[rand(0..(Task.task_types.length - 1))],
    title: Faker::Hobby.activity,
    description: Faker::Quote.famous_last_words + ' ' + Faker::Lorem.paragraph(sentence_count: rand(15..30)),
    comment: Faker::Quote.famous_last_words,
    start_date: start_date,
    due_date: due_date,
    completed: false
  )
  task.user = users.sample
  task.save!
  j = 0
  rand(2..5).times do
    j += 1
    subtask = Subtask.new(
      order: j + 1,
      title: Faker::Hobby.activity,
      description: Faker::Lorem.paragraph(sentence_count: rand(15..30)),
      comment: Faker::Quote.famous_last_words,
      start_date: start_date,
      due_date: due_date,
      completed: false,
    )
    subtask.task = task
    subtask.save!
  end

end

i = 0
10.times do
i += 1
  start_date = Date.today + rand(1..7)
  due_date = start_date + rand(0..3)

  routine = Task.routines.keys[rand(0..(Task.routines.length - 1))]
  if routine != Task::NONE_ROUTINE_NAME.to_s
    these_days = Hash[days.map { |day| [day, one_in_three.sample] }]
  else
    these_days = Hash[days.map { |day| [day, false] }]
  end

  task = Task.new(
    order: i + 1,
    routine: routine,
    recurs_on: these_days,
    active: true,
    task_type: Task.task_types.keys[rand(0..(Task.task_types.length - 1))],
    title: Faker::Hobby.activity,
    description: Faker::Lorem.paragraph(sentence_count: rand(15..30)),
    comment: Faker::Quote.famous_last_words,
    start_date: start_date,
    due_date: due_date,
    completed: false
  )
  task.user = users.sample
  task.save!
  j = 0
  rand(2..5).times do
    j += 1
    subtask = Subtask.new(
      order: j + 1,
      title: Faker::Hobby.activity,
      description: Faker::Lorem.paragraph(sentence_count: rand(15..30)),
      comment: Faker::Quote.famous_last_words,
      start_date: start_date,
      due_date: due_date,
      completed: false,
    )
    subtask.task = task
    subtask.save!

  end

end

# Ctegories...
15.times do

  cats << Category.create(category: Faker::Lorem.words(number: rand(1..2)).join('-'))

end

# Journal Entries...
15.times do

  user = users.sample

  je = JournalEntry.new(
    title: Faker::Hobby.activity,
    entry: Faker::Quote.famous_last_words
  )

  je.user = user

  # Add some categories...
  # This breaks the seed file on occaision!!!
  rand(1..7).times do

    cat = cats.sample

    jc = JournalCategory.new(journal_entry: je, category: cat)

    if !jc.valid?
      # p jc.errors, je, jc, cat
    else
      jc.save!
    end

  end

  if !je.persisted?
    if je.valid?
      je.save!
    else
      p je.errors
    end
  end

end
puts "...seeding DB Complete!"

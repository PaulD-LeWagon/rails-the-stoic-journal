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
  email: "test@test.com",
  password: "password",
  username: "user",
  first_name: "Test",
  last_name: "User",
  admin: false,
  image_url: "https://www.w3schools.com/howto/img_avatar.png",
  bio: "I am the test user.",
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
  start_date = Date.today
  # Cold Shower (Stoic Discipline)
  task = Task.new(
    routine: "morning",
    recurs_on: these_days,
    task_type: "stoic_discipline",
    title: "Cold Shower",
    description: "A quick shower to get your body ready for the day.",
    start_date: Time.parse("#{start_date} 06:00"),
    duration: 15.minutes,
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
    { title: "Hand 2 Hand Swings - 5x15 Reps", duration: 10.minutes },
    { title: "One Handed Cleans - 5x10 Reps", duration: 10.minutes },
    { title: "Full Snatch - 5x20 Reps", duration: 10.minutes },
    { title: "Hand 2 Hand Swings - 5x15 Reps", duration: 10.minutes },
  ]
    .each do |details|
    subtask = Subtask.new(
      title: details[:title],
      description: Faker::Lorem.paragraph(sentence_count: rand(2..3)),
      duration: details[:duration],
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
    { title: "Find a calm and quiet place.", duration: 2.minutes },
    { title: "Make yourself comfortable.", duration: 2.minutes },
    { title: "Now, empty your mind and meditate!", duration: 21.minutes },
  ]
    .each do |details|
    subtask = Subtask.new(
      title: details[:title],
      duration: details[:duration],
    )
    subtask.task = task
    subtask.save!
  end

  # Evening Routine - Stoic Exercise (Review the Day)
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
    { title: "Mentally review the day three times from beginning to end.", duration: 10.minutes },
    { title: "What mistakes did you make today?", duration: 5.minutes },
    { title: "What virtue, that is, what strength or wisdom did you show today?", duration: 5.minutes },
    { title: "What have you omitted or what could have been done better?", duration: 5.minutes },
    { title: "Gratitude - What are you grateful for today?", duration: 10.minutes },
  ]
    .each do |details|
    subtask = Subtask.new(
      title: details[:title],
      duration: details[:duration],
    )
    subtask.task = task
    subtask.save!
  end
end

these_days = Hash[days.map { |day| [day, "0"] }]
routine = Task::NONE_ROUTINE_NAME.to_s

users.each_with_index do |user, i|
  # Example Task (Explaining/hinting at the features)
  task = Task.new(
    routine: routine,
    recurs_on: these_days,
    task_type: "general",
    title: "This is a TASK - Click me and edit me. I'll autoupdate when I lose focus!",
    description: %{
    I am also editable in-situ no need to redirect to the uber edit form! I'll
    also autoupdate when I lose focus like any other element, switch or clicky
    thing on me 'the task card'! Also, If you want to drag me to a different
    place on the page. I'll auto-close the moment you click the grab handle.
    And, if you click on the time I'll open a datepicker so you can pick a new
    date/time for me. If you check me as complete I'll make sure all my subtasks
    have been checked aswell. And, if you change your mind and uncheck me, I'll
    uncheck the last subtask for you! However, if you want to configure the
    durations of any subtasks you'll have to open the Edit form for that, sorry.
  }.gsub(/\s+/, " ").strip,
    start_date: Time.parse("#{Date.today} 07:00"),
  )
  task.user = user
  task.save!
  [
    {
      title: "I am the Alpha Task!",
      description: "I am the first task in the list. That makes me the Alpha but not the Omega!",
      duration: 15.minutes,
    },
    {
      title: "I am Secundus - the second task!",
      description: "I am the piggy in the middle of the list. That makes me the Beta but not the Omega!",
      duration: 15.minutes,
    },
    {
      title: "I am the Omega Task!",
      description: "I am the last task in the list. That makes me the Omega but not the Alpha!",
      duration: 15.minutes,
    },
  ].each do |details|
    subtask = Subtask.new(
      title: details[:title],
      description: details[:description],
      duration: details[:duration],
    )
    subtask.task = task
    subtask.save!
  end

  # Dragon Bootcamp
  task = Task.new(
    routine: routine,
    recurs_on: these_days,
    task_type: "stoic_discipline",
    title: "Dragon Bootcamp - F8ck Yeah!",
    description: "All things to do with dragons and riding them. Drakaris!!!",
    start_date: Time.parse("#{Date.today} 07:30"),
  )
  task.user = user
  task.save!
  [
    { title: "Dragon Thoery 101.",
      description: "Just all the boring stuff!",
      duration: 30.minutes },
    {
      title: "Dressage with Vermithor - The Bronze Fury!",
      description: "Teaching the beast to dance!",
      duration: 60.minutes,
    },
    {
      title: "Dragon Riding",
      description: "'Riding' Lessons with the Dragon Queen (Rhaenyra of course!).",
      duration: 120.minutes,
    },
  ].each do |details|
    subtask = Subtask.new(
      title: details[:title],
      description: details[:description],
      duration: details[:duration],
    )
    subtask.task = task
    subtask.save!
  end
end

start_date = Date.today
one_in_three_days = [start_date, start_date - 1.day, start_date + 1.days]
# Create some non-routine tasks - actual core-day tasks
45.times do
  # Randomise the start time
  start_time = "#{rand(8..18)}:#{["00", "15", "30", "45"].sample}"
  start_date = start_time.chars.count == 4 ? Time.parse("#{one_in_three_days.sample} 0#{start_time}") : Time.parse("#{one_in_three_days.sample} #{start_time}")

  task = Task.new(
    routine: routine,
    recurs_on: these_days,
    task_type: Task.task_types.keys[rand(0..(Task.task_types.length - 1))],
    title: Faker::Hobby.activity,
    description: Faker::Quote.famous_last_words + "\n " + Faker::Lorem.paragraph(sentence_count: rand(15..30)),
    comment: Faker::Quote.famous_last_words,
    start_date: start_date,
  )
  task.user = users.sample
  task.save!
  duration = [15, 30, 45, 60].sample.minutes
  # Add subtasks
  rand(2..3).times do
    subtask = Subtask.new(
      title: Faker::Hobby.activity,
      description: Faker::Lorem.paragraph(sentence_count: rand(15..30)),
      comment: Faker::Quote.famous_last_words,
      duration: duration,
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

puts "...database seeded successfully!"

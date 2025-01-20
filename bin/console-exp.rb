# t = Task.first
# recurs = t.recurs_on
# today = Time.now
# p "#{t.task_type}, #{t.title}, #{t.routine}, #{t.user.full_name}"
# 7.times do |i|
#   j = i + 1
#   day = (today + j.day).strftime("%A").downcase
#   if eval("t.#{day}").to_i == 1
#     p "Next occurence is #{day}"
#     break
#   else
#     p "Not #{day}"
#   end
# end

# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!

# Rails.logger = Logger.new(STDOUT)
# Rails.logger.level = Logger::INFO
# Rails.logger.datetime_format = "%Y-%m-%d %H:%M:%S"

# # log formatter
# Rails.logger.formatter = proc do |severity, datetime, progname, msg|
#   datetime = datetime.strftime("%Y-%m-%d %H:%M:%S") if datetime.nil?
#   "#{datetime}, #{severity}: #{msg} from [#{progname}]\n"
# end

# Rails.application.configure do
#   config.log_tags = [:request_id]
#   config.logger = ActiveSupport::Logger.new("log/#{Rails.env}-debug.log")
# end

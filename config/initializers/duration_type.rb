class DurationType < ActiveRecord::Type::String
  def cast(value)
    return value if value.blank? || value.is_a?(ActiveSupport::Duration)

    if value.kind_of?(Integer)
      return ActiveSupport::Duration.build(value)
    elsif value.kind_of?(String)
      if /^\d{2}:\d{2}(:\d{2})?$/.match(value)
        value = "#{value}:00" if value.length == 5
        return ActiveSupport::Duration.build(value.split(":").map(&:to_i).inject(0) { |a, b| a * 60 + b })
      else
        return ActiveSupport::Duration.parse(value)
      end
    end
  end

  def serialize(duration)
    duration ? duration.iso8601 : nil
  end
end

ActiveRecord::Type.register(:duration, DurationType)

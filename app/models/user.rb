class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :tasks
  has_many :journal_entries

  def full_name
    if !first_name.blank?
      if !last_name.blank?
        return "#{first_name} #{last_name}"
      end
    elsif !last_name.blank?
      return last_name
    end
    email
  end
end

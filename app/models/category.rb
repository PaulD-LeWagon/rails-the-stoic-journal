class Category < ApplicationRecord
  has_many :journal_entries, through: :journal_category
end

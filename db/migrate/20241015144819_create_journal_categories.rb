class CreateJournalCategories < ActiveRecord::Migration[7.1]
  def change
    create_table :journal_categories do |t|
      t.references :journal_entry, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end

class CreateRoutines < ActiveRecord::Migration[7.1]
  def change
    create_table :routines do |t|
      t.references :task, null: false, foreign_key: true
      t.integer :type, default: 0
      t.json :recurs_on, default: {}

      t.timestamps
    end
  end
end

class CreateTasks < ActiveRecord::Migration[7.1]
  def change
    create_table :tasks do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :task_type
      t.integer :routine
      t.integer :order
      t.string :title
      t.text :description
      t.text :comment
      t.datetime :start_date
      t.datetime :due_date
      t.boolean :completed
      t.boolean :active

      t.timestamps
    end
  end
end

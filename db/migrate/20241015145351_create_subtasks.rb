class CreateSubtasks < ActiveRecord::Migration[7.1]
  def change
    create_table :subtasks do |t|
      t.references :task, null: false, foreign_key: true
      t.integer :order, null: false, default: 0
      t.string :title, null: false, default: ""
      t.text :description, null: false, default: ""
      t.text :comment, null: false, default: ""
      t.datetime :start_date
      t.datetime :due_date
      t.boolean :completed, null: false, default: false

      t.timestamps
    end
  end
end

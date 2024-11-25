# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_11_24_220106) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "journal_categories", force: :cascade do |t|
    t.bigint "journal_entry_id", null: false
    t.bigint "category_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_journal_categories_on_category_id"
    t.index ["journal_entry_id"], name: "index_journal_categories_on_journal_entry_id"
  end

  create_table "journal_entries", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "title"
    t.text "entry"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_journal_entries_on_user_id"
  end

  create_table "subtasks", force: :cascade do |t|
    t.bigint "task_id", null: false
    t.integer "order", default: 0, null: false
    t.string "title", default: "", null: false
    t.text "description", default: "", null: false
    t.text "comment", default: "", null: false
    t.datetime "start_date"
    t.datetime "due_date"
    t.boolean "completed", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["task_id"], name: "index_subtasks_on_task_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "routine", default: 0, null: false
    t.json "recurs_on", default: {"monday"=>"0", "tuesday"=>"0", "wednesday"=>"0", "thursday"=>"0", "friday"=>"0", "saturday"=>"0", "sunday"=>"0"}, null: false
    t.boolean "active", default: true, null: false
    t.integer "task_type", default: 0, null: false
    t.string "title", default: "", null: false
    t.text "description", default: "", null: false
    t.text "comment", default: "", null: false
    t.datetime "start_date"
    t.datetime "due_date"
    t.boolean "completed", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_tasks_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "admin", default: false
    t.string "username"
    t.string "first_name"
    t.string "last_name"
    t.text "image_url"
    t.text "bio"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "journal_categories", "categories"
  add_foreign_key "journal_categories", "journal_entries"
  add_foreign_key "journal_entries", "users"
  add_foreign_key "subtasks", "tasks"
  add_foreign_key "tasks", "users"
end

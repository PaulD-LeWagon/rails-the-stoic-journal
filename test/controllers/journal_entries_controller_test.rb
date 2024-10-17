require "test_helper"

class JournalEntriesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get journal_entries_index_url
    assert_response :success
  end

  test "should get show" do
    get journal_entries_show_url
    assert_response :success
  end

  test "should get new" do
    get journal_entries_new_url
    assert_response :success
  end

  test "should get edit" do
    get journal_entries_edit_url
    assert_response :success
  end
end

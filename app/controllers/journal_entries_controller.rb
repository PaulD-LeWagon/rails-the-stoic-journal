class JournalEntriesController < ApplicationController
  before_action :set_journal_entry, only: %i[ show edit update destroy ]

  def index
    if current_user.admin?
      @journal_entries = policy_scope(JournalEntry).order(user_id: :asc)
    else
      @journal_entries = policy_scope(JournalEntry).where(user_id: current_user)
    end
  end

  def show
    authorize @journal_entry
  end

  def new
    @journal_entry = JournalEntry.new
    @journal_entry.user = current_user
    authorize @journal_entry
  end

  def edit
    authorize @journal_entry
  end

  def create
    @journal_entry = JournalEntry.new(journal_entry_params)
    @journal_entry.user = current_user
    authorize @journal_entry

    if @journal_entry.save!
      redirect_to @journal_entry, notice: "JournalEntry #{@journal_entry.title} was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    authorize @journal_entry
    if @journal_entry.update!(journal_entry_params)
      redirect_to @journal_entry, notice: "JournalEntry #{@journal_entry.title} was successfully updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    authorize @journal_entry
    title = @journal_entry.title
    @journal_entry.categories.destroy_all
    @journal_entry.destroy
    redirect_to journal_entries_path, notice: "JournalEntry #{title} was successfully destroyed."
  end

  private

  def journal_entry_params
    params.require(:journal_entry).permit(:title, :entry, :created_at, :updated_at, :user_id)
  end

  def set_journal_entry
    @journal_entry = JournalEntry.find(params[:id])
  end
end

class TasksController < ApplicationController
  before_action :set_task, only: %i[ show edit update destroy ]

  def index
    @tasks = policy_scope(Task)
  end

  def show
    authorize @task
  end

  # GET /tasks/new
  def new
    @task = Task.new
    @task.user = current_user
    authorize @task
  end

  # GET /tasks/1/edit
  def edit
    authorize @task
  end

  # POST /tasks
  def create
    @task = Task.new(task_params)
    @task.user = current_user
    authorize @task

    if @task.save
      redirect_to @task, notice: "task was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/1
  def update
    authorize @task
    if @task.update(task_params)
      redirect_to @task, notice: "task was successfully updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/1
  def destroy
    authorize @task
    @task.destroy
    redirect_to tasks_url, notice: "task was successfully destroyed."
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:title, :description, :task_type, :routine, :order, :comment, :start_date, :due_date, :completed, :active)
  end
end

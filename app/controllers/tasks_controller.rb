class TasksController < ApplicationController
  before_action :set_task, only: %i[ show edit update destroy ]

  def index
    @tasks = policy_scope(Task)
  end

  def show
    authorize @task
  end

  def new
    @task = Task.new
    @task.user = current_user
    authorize @task
  end

  def edit
    authorize @task
  end

  def create
    @task = Task.new(task_params)
    @task.user = current_user
    authorize @task

    if @task.save
      redirect_to tasks_path, notice: "Task #{@task.title} was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    authorize @task
    if @task.update(task_params)
      redirect_to tasks_path, notice: "Task #{@task.title} was successfully updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    authorize @task
    title = @task.title
    @task.sub_tasks.destroy_all
    @task.destroy
    redirect_to tasks_url, notice: "Task #{title} was successfully destroyed."
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:title, :description, :task_type, :routine, :order, :comment, :start_date, :due_date, :completed, :active)
  end
end

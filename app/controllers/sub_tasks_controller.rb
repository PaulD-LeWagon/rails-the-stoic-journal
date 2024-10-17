class SubTasksController < ApplicationController
  before_action :set_sub_task, only: %i[ show edit update destroy ]

  def index
    @sub_tasks = policy_scope(SubTask)
  end

  def show
    authorize @sub_task
  end

  # GET /tasks/:task_id/subtask/new
  def new
    # @task = Task.find(params[:task_id])
    @sub_task = SubTask.new(task: Task.find(params[:task_id]))
    # @sub_task.order = @task.default_subtask_order
    # @sub_task.task = @task
    authorize @sub_task
  end

  # GET /subtasks/1/edit
  def edit
    authorize @sub_task
  end

  # POST
  def create
    @task = Task.find(params[:task_id])
    @sub_task = SubTask.new(sub_task_params)
    @sub_task.task = @task
    authorize @sub_task

    if @sub_task.save
      redirect_to @sub_task, notice: "Sub task successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /subtasks/1
  def update
    authorize @sub_task
    if @sub_task.update(sub_task_params)
      redirect_to @sub_task, notice: "Sub task #{@sub_task.title} successfully updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # DELETE /SubTasks/1
  def destroy
    authorize @sub_task
    @sub_task.destroy
    redirect_to sub_tasks_url, notice: "Sub task #{@sub_task.title} was successfully destroyed."
  end

  private

  def set_sub_task
    @sub_task = SubTask.find(params[:id])
  end

  def sub_task_params
    params.require(:sub_task).permit(:order, :title, :description, :comment, :start_date, :due_date, :completed)
  end
end

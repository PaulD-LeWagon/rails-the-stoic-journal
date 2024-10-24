Rails app generated with [lewagon/rails-templates](https://github.com/lewagon/rails-templates), created by the [Le Wagon coding bootcamp](https://www.lewagon.com) team.


<div id="<%= dom_id task %>_subtasks" class="<%= dom_id task %>_subtasks collapse-container collapse" data-controller="dragula"></div>

          <% task.subtasks.each do |subtask| %>

            <div class="card subtask m-1">
              <div class="card-header d-flex justify-content-between align-items-center">
                <h3><i class="fa-solid fa-grip handle"></i> #<span><%= subtask.order %></span>  <%= subtask.title %></h3>
                <div class="d-flex justify-content-end">
                  <%= render 'subtasks/links', subtask: subtask %>
                  <!--
                  <i class="fa-solid fa-square-check"></i>
                  <i class="fa-regular fa-square-check"></i>
                  -->
                  <a href="#" type="button"
                    class="collapser btn btn-warning m-1"
                    data-bs-toggle="collapse"
                    data-bs-target="#<%= dom_id subtask %>"
                    aria-expanded="false"
                    aria-controls="<%= dom_id subtask %>">
                    <i class="fa-solid fa-chevron-down"></i>
                  </a>
                </div>
              </div>
              <div class="card-body collapse" id="<%= dom_id subtask %>">
                <p class="card-text bd-font"><%= subtask.description %></p>
              </div>
            </div>

          <% end %>

        </div>

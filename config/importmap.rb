# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "stimulus.min.js", preload: true
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true
pin_all_from "app/javascript/controllers", under: "controllers"
pin "bootstrap", to: "bootstrap.min.js", preload: true
pin "@popperjs/core", to: "popper.js", preload: true
pin "vanilla-nested", to: "vanilla_nested.js", preload: true
pin "sweetalert2" # @11.14.1
pin "Sortable"
pin "classList"
pin "flatpickr" # @4.6.13
pin "confirmDate" # @3.3.0
pin "utilities"
pin "hotwire-events"

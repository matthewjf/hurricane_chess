class ApplicationRecord < ActiveRecord::Base
  COMMIT_ACTIONS = ['create', 'update', 'destroy']
  self.abstract_class = true
end

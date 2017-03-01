source 'https://rubygems.org'
ruby "2.3.1"

gem 'rails', '~> 5.0.0', '>= 5.0.0.1'
gem 'listen', '~> 3.0.5'
gem "react_on_rails", "~> 6.1"

gem 'puma', '~> 3.0'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'

group :development, :test do
  gem 'byebug', platform: :mri
  gem "foreman"
end

group :development do
  gem 'web-console'
end

group :test  do
  gem "coveralls", require: false
  gem "capybara"
  gem "capybara-webkit"
  gem "chromedriver-helper"
  gem "poltergeist"
  gem "rspec-rails", "~> 3"
  gem "rspec-retry"
  gem "selenium-webdriver", "<3.0.0"
end

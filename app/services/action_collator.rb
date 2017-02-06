# frozen_string_literal: true
class ActionCollator
  PRIVATE_KEYS = %w(action_referrer_email action_referer action_express_donation).freeze
  PREFIXES = %w(action_textentry_ action_box_ action_dropdown_ action_choice_ action_).freeze

  def self.run(actions)
    new(actions).run
  end

  def self.csv(actions, keys: nil, skip_headers: false)
    new(actions, keys: keys, skip_headers: skip_headers).csv
  end

  def initialize(actions, keys: nil, skip_headers: false)
    @actions = actions
    @keys = keys
    @skip_headers = skip_headers
  end

  def run
    [hashes, keys, headers]
  end

  def csv
    rows = @actions.map do |action|
      keys.map { |k| action.form_data[k] }
    end
    rows = rows.unshift(headers) unless @skip_headers
    rows.map { |r| r.join(',') }.join("\n")
  end

  def hashes
    @hashes ||= @actions.map do |action|
      keys.map { |k| [k, action.form_data[k]] }.to_h
    end
  end

  def keys
    return @keys if @keys.present?
    all_keys = @actions.map { |a| a.form_data.keys }.flatten.uniq
    @keys = all_keys.reject { |k| PRIVATE_KEYS.include?(k) }.select { |k| ActionKitFields.has_valid_form(k) }
  end

  def headers
    @headers ||= keys.map do |key|
      PREFIXES.each { |p| key = key.remove(p) }
      key.titleize
    end
  end
end
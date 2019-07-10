
## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false,unique: true,index: true|
|email|string|null: false,unique: true|
|group|references|null: false,foreign_key: true|

### Association
has_many :users_groups
has_many :groups, through: :users_groups


## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|text|string|
|image|text|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
belongs_to :user
belongs_to :group

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
has_many :users_groups
has_many :users, through: :users_groups


## users_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
belongs_to :group
belongs_to :user
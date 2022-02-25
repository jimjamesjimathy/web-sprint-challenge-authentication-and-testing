exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('users')
    .truncate()
    .then(function() {
      return knex('users').insert([
        { 
                    username: 'Ally Gator',
                    password: '$2a$08$ZaQwfzRvDXxAsFqEpo82wu1Ea0/77B00wjQt0ieg3XVW3Ht5gIiLG',
                },
                { 
                    username: 'Molly Cule',
                    password: '$2a$08$rfPvTPir0q/8pWjEs1oX6exjIuPg.QjY7zUgZRY/myYUF.mInauc2',
                },
                { 
                    username: 'Phillip McCrevis',
                    password: '$2a$08$Wt42/ySzaAnghNWYuxzPDOrGR3DQpSUUu0zgkk4hhvQB0dH0UtghG',
                },
                { 
                    username: 'William Nilliam',
                    password: '$2a$08$TLqcKYTSJx5g84BhVJNuFunaDZRMXD6HsYIvckWTQueG6heYaPy6G',
                },
      ]);
    });
};
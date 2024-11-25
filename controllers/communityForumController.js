const pool = require('../config/db');

// Add a new forum post
exports.addPost = async (req, res) => {
  const { author, title, content } = req.body;

  try {
    const query = `
      INSERT INTO community_posts (author, title, content)
      VALUES ($1, $2, $3) RETURNING *;
    `;
    const values = [author, title, content];
    const result = await pool.query(query, values);

    res.status(201).json({ message: 'Post added successfully.', post: result.rows[0] });
  } catch (error) {
    console.error('Error adding post:', error);
    res.status(500).json({ error: 'Failed to add post.' });
  }
};

// Fetch all forum posts
exports.getAllPosts = async (req, res) => {
  try {
    const query = 'SELECT * FROM community_posts ORDER BY created_at DESC;';
    const result = await pool.query(query);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts.' });
  }
};

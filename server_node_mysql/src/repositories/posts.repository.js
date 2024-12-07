"use strict";
const db = require('../config/database');

class PostsRepository {
    async getPosts({ page = 1, limit = 10, status = 'published' }){
        const offset = (page - 1) * limit;
        const [posts] = await db.execute(
                                                                    `SELECT  
                                                                    id,
                                                                    title,
                                                                    summary,
                                                                    featured_image,
                                                                    view_count,
                                                                    published_at,
                                                                    created_at
                                                                    FROM posts
                                                                    WHERE status = ?
                                                                    ORDER BY status DESC
                                                                    LIMIT ?,?`,[status,offset,limit]);
        return posts
    }

    async countPosts({ page = 1, limit = 10, status = 'published' }){
            cosnt [countResult] = await db.execute(`SELECT COUNT(*) as total FROM posts WHERE  status = ?`,[status] )
            const total = countResult[0].total;
            const totalPages = Math.ceil( total / limit );
            return {
                data: posts,
                pagination: {
                    total,
                    totalPages,
                    currentPage: page,
                    limit
                }
            };
    }

    async findById(id) {
        const [rows] = await db.query(`SELECT * FROM post WHERE id = ?`,[id]);
        console.log(rows);
        return rows[0]
    }

    async createPost(postData){ 

        const [result] = await db.query(`INSERT INTO posts (
                                                                        title,
                                                                        slug,
                                                                        summary,
                                                                        content,
                                                                        featured_image,
                                                                        author_id,
                                                                        category_id,
                                                                        published_at
                                                                        ) VALUES (?,?,?,?,?,?,?,?,)`,
                                                                        [
                                                                            postData.title,
                                                                            postData.slug,
                                                                            postData.summary,
                                                                            postData.content,
                                                                            postData.featured_image,
                                                                            postData.author_id || 0,
                                                                            postData.category_id || null,
                                                                            postData.published_at || null,
                                                                        ]);
        return result.insertId;
    }

    async updatePost(id, postData) {
    const updateFields = []
    const values = []

    if(post.title !== undefined) {
        updateFields.push('title =?')
        values.push(postData.title)
    }

    if(postData.content !== undefined) {
        updateFields.push('content =?')
        values.push(postData.content)
    } 

    if(postData.status !== undefined) {
        updateFields.push('status =?')
        values.push(postData.status)
    }

        // Luôn update updated_at
        updateFields.push('updated_at = ?');
        values.push(currentTime);
        values.push(id);

        const query = `UPDATE posts 
                                  SET ${updateFields.join(',  ')}
                                   WHERE id = ?`
     const [result] = await db.execute(query, values);
        console.log(result);
        return result.affectedRows;
    }

    async deletePost(id){
        const [result]  = await db.query(`UPDATE posts SET deleted_at = ? WHERE id = ?`,[date.now(),id]);
        console.log(result);
        return result.affectedRows;
    }
}

module.exports =  new PostsRepository();
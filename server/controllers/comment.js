import mongoose from 'mongoose'
import path from 'path'
import os from 'os'
import fs from 'fs'
import formidable from 'formidable'
const Blog = mongoose.model('Article')

export const postComment = async(ctx, next) => {
    let { articleId, content } = ctx.request.body
    console.log('post comment', ctx.request.body)
    if (!articleId) {
        return (ctx.body = {
            success: false,
            err: 'id is required'
        })
    }

    try {
        let comment = {
            userId: ctx.request.user._id,
            content,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }

        console.log('comment', comment)

        await Blog.updateOne({'_id': articleId}, {
            $push: {
                comments: comment
            }
        })


        comment.user = {
            nickname: 'gilbert',
            avatar: 'gilbert.jpg'
        }
        
        ctx.body = {
            success: true,
            data: comment
        }
    } catch (e) {
        ctx.body = {
            success: false,
            err: e
        }
    }
}

export const patchComment = async(ctx, next) => {
    let { id, userId, content, commentId } = ctx.request.body
    if (!id) {
        return (ctx.body = {
            success: false,
            err: 'id is required'
        })
    }

    try {
        await Blog.updateOne({
            '_id': id,
            'comments._id': commentId,
            'comments.userId': ctx.request.user._id
        }, {
            $set: {
                'comments.$.content': content,
                'comments.$.updateAt': Date.now()
            }
        })

        ctx.body = {
            success: true
        }
    } catch (e) {
        ctx.body = {
            success: false,
            err: e
        }
    }
}

export const deleteComment = async(ctx, next) => {
    let { id, commentId } = ctx.params

    if (!id) {
        return (ctx.body = {
            success: false,
            err: 'id is required'
        })
    }

    try {
        await Blog.update({'_id': id}, {
            $pull: {
                'comments.$._id': commentId,
                'comments.$.userId': ctx.request.user._id
            }
        })

        ctx.body = {
            success: true
        }
    } catch (e) {
        ctx.body = {
            success: false,
            err: e
        }
    }
}
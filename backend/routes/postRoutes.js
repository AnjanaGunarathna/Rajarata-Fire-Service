const {Router} = require ('express')

const  {createPost, getPosts, getPost, getCatPosts, getUserPosts, editPost, deletePost} = require('../controller/postControllers')



const router = Router()

router.post('/', createPost)
router.get('/', getPosts)
router.get('/:id', getPost)
router.get('/categories/:category', getCatPosts)
router.get('/users/:id', getUserPosts)
router.patch('/:id',  editPost)
router.delete('/:id', deletePost)
   



module.exports = router
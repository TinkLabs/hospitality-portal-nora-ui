import i18n from '../i18n';

const mutation = `
mutation upsertComment($comment: CommentInput){
  upsertComment(comment: $comment){
    _id
    rating
    comment
    restaurant{
      _id
    }
    userName
    approved
  }
}
`;

export default mutation;
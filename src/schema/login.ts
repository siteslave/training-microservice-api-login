import S from 'fluent-json-schema'

const registerSchema = S.object()
  .prop('username', S.string().minLength(4).required())
  .prop('password', S.string().minLength(4).required())

export default {
  body: registerSchema
}
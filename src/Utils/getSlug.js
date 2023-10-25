import slugify from 'slugify'

export function getSlug(params) {
  return slugify(params, {
      lower: true,
      strict: true
  })
  // params.low
}
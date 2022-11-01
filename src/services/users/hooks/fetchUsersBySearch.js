module.exports = function ()
{
    return async context =>
    {
        if (context.params.query.fullname)
        {
            context.params.query = {
                $or: [
                    { firstName: new RegExp(`^${ context.params.query.fullname }`, "i") },
                    { lastName: new RegExp(`^${ context.params.query.fullname }`, "i") }
                ]
            }
        }
        return context
    }
}
export default {
    createSQLbyIds: (ids) => {
        let result = '';
        for (let i = 0; i < ids.length; i++) {
            if( i === ids.length - 1) {
                result += ' id = (?));';
                continue;
            }
            result += ' id = (?) OR';
        }
        result += ');'
        return result;
    }
}
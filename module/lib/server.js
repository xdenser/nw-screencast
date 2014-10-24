/**
 * Created with JetBrains WebStorm.
 * User: khanzhiyev
 * Date: 24.10.14
 * Time: 11:07
 * To change this template use File | Settings | File Templates.
 */

require('./dnodeTransport/server');
require('./httpTransport/server');
module.exports = {
    Connection: require('./servingConnection.js'),
    Transport: require('./transport.js')
}
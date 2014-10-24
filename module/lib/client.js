/**
 * Created with JetBrains WebStorm.
 * User: khanzhiyev
 * Date: 24.10.14
 * Time: 11:17
 * To change this template use File | Settings | File Templates.
 */
require('./dnodeTransport/client');
require('./httpTransport/client');
module.exports = {
    Connection: require('./receivingConnection.js'),
    Transport: require('./transport.js')
}
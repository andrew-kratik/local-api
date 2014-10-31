var _ = require('lodash');

module.exports = function(config){

    function getRedirectUrl(req){

        var query = req.query,
            token,
            resPath = '',
            redirectUrl = config.arbiterUrl;

        _.defaults(query, {
            aid: 0,
            gid: 0,
            m: false,
            p: false,
            sdk: 'js'
        });

        token = (query.aid == 0 && query.gid == 0) ? config.memberToken : config.appToken;

        if (query.sdk == 'js' || query.sdk == 'ios' || query.sdk == 'android') {
            resPath += '#access_token=' + token + '&token_type=Bearer&expires_in=3600';

            redirectUrl = config.arbiterUrl + resPath;
        } else {
            resPath += '?access_token=' + token;
            resPath += '&token_type=Bearer&expires_in=3600&signed=no';

            redirectUrl = data.app.redirect + resPath;
        }

        return redirectUrl;
    }

    return {
        auth: function (req, res) {
            res.redirect(303, getRedirectUrl(req));
        },

        signin: function (req, res) {
            res.redirect(303,getRedirectUrl(req));
        },

        logout: function (req, res) {
            res.redirect(303,'http://isaacloud.com');
        },

        token: function (req, res) {
            if(req.method == 'POST'){

                res.header('Content-Type','application/json');
                res.send({
                    token_type:'Bearer',
                    access_token: config.appToken,
                    expires_in: 3600
                });

            } else {
                res.redirect(303,'http://isaacloud.com');
            }


        }

    };


};
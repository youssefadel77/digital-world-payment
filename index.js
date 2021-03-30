const errors = require('./errors.js');
const axios = require('axios');

class DigitalWorld {

    /**
     * @param config {
     *     endpoint:{String}
     *     merchant_email : { type : String },
     *     secret_key : { type: String }
     */

    constructor(config) {
        // Errors
        this.ValidationError = errors.ValidationError;
        this.config = config;
        this._validateConfiguration();
        this._createHttpClient();
    }

    _validateConfiguration() {
        if (!this.config.merchant_email || !this.config.endpoint || !this.config.secret_key || !this.config.site_url || !this.config.return_url) {
            throw new this.ValidationError('the config not completed !');
        }
    }

    _createHttpClient() {
        this.instance = axios.create({
            baseURL: this.config.endpoint
        });
        this.instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    }


    /**
     *@param obj {
     *    merchant_email: { type: String },
     *    secret_key: { type: String }
     *	}
     * }
     */

    async validateSecretKey(obj) {
        this._validateValidSecretKeyRequestData(obj);
        const formUrlEncoded = x => Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');
        const {data} = await this.instance.post('/authenticate_key', formUrlEncoded(obj));
        return data;
    }

    _validateValidSecretKeyRequestData(data) {
        if (!data.merchant_email || !data.secret_key) {
            throw new this.ValidationError('the data not completed !');
        }
    }

    /**
     *@param obj {
     *    merchant_email: { type: String },
     *    secret_key: { type: String },
     *    payment_reference: { type : String }
     *	}
     * }
     */

    async verifyPayment(paymentReference) {
        const request = {
            merchant_email: this.config.merchant_email,
            secret_key: this.config.secret_key,
            payment_reference: paymentReference
        };
        this._validateVerifyPaymentRequestData(request);
        const formUrlEncoded = x => Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');
        const {data} = await this.instance.post('/uphold_payment', formUrlEncoded(request));
        return data;
    }

    _validateVerifyPaymentRequestData(data) {
        if (!data.merchant_email || !data.secret_key || !data.payment_reference) {
            throw new this.ValidationError('the data not completed !');
        }
    }

    /**
     *@param obj {
     *    merchant_email: { type: String },
     *    secret_key: { type: String },
     *    paypage_id: { type : String },
     *    reference_number: { type : String },
     *    refund_amount: { type : String },
     *    refund_reason: { type : String },
     *    transaction_id: { type : String },
     *	}
     * }
     */

    async refundTransaction(obj) {
        const request = {
            merchant_email: this.config.merchant_email,
            secret_key: this.config.secret_key,
            ...obj
        };
        this._validateRefundTransactionRequestData(request);
        const formUrlEncoded = x => Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');
        const {data} = await this.instance.post('/refund_process', formUrlEncoded(request));
        return data;
    }

    _validateRefundTransactionRequestData(data) {
        if (!data.merchant_email ||
            !data.secret_key ||
            !data.paypage_id ||
            !data.reference_number ||
            !data.refund_amount ||
            !data.refund_reason ||
            !data.transaction_id
        ) {
            throw new this.ValidationError('the data not completed !');
        }
    }

    /**
     *@param obj {
     *    merchant_email: { type: String },
     *    secret_key: { type: String },
     *    startdate: { type : String },
     *    enddate: { type : String }
     *	}
     * }
     */

    async transactionsReports(obj) {
        const request = {
            merchant_email: this.config.merchant_email,
            secret_key: this.config.secret_key,
            ...obj
        };
        this._validateTransactionsReportsRequestData(request);
        const formUrlEncoded = x => Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');
        const {data} = await this.instance.post('/transaction_details', formUrlEncoded(request));
        return data;
    }

    _validateTransactionsReportsRequestData(data) {
        if (!data.merchant_email ||
            !data.secret_key ||
            !data.startdate ||
            !data.enddate
        ) {
            throw new this.ValidationError('the data not completed !');
        }
    }

    /**
     *@param obj {
     *    merchant_email: { type: String },
     *    secret_key: { type: String }
     *	}
     * }
     */

    async createPayPage(obj) {
        const request = {
            ...this.config,
            ...obj
        };
        this._validateCreatePayPageRequestData(request);

        const formUrlEncoded = x => Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');
        const {data} = await this.instance.post('/generate_payment_page', formUrlEncoded(request));
        return data;
    }

    _validateCreatePayPageRequestData(data) {
        if (!data.merchant_email ||
            !data.secret_key
        ) {
            throw new this.ValidationError('the data not completed !');
        }
    }

}

module.exports = DigitalWorld;

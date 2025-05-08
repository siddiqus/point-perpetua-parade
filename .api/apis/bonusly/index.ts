import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'bonusly/1.0.0 (api/6.1.3)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * View the 50 most recent achievements for the authenticated user's company.
   *
   * @summary List Achievements
   */
  listAchievements(): Promise<FetchResponse<200, types.ListAchievementsResponse200>> {
    return this.core.fetch('/v1/achievements', 'get');
  }

  /**
   * This returns a count of posts by the most popular hashtags in the last 15 days. Counts
   * are live and update with every request.
   *
   * @summary Trends
   * @throws FetchError<449, types.TrendsResponse449> Error - not ready
   */
  trends(): Promise<FetchResponse<200, types.TrendsResponse200>> {
    return this.core.fetch('/v1/analytics/trends', 'get');
  }

  /**
   * This endpoint returns users ranked by the number of bonuses they've given or received.
   * You can make your query more specific by requesting bonuses with a particular hashtag,
   * bonuses given/received by users on a particular team, or bonuses given/received within a
   * particular date range.
   *
   * @summary Leaderboards
   * @throws FetchError<400, types.LeaderboardsResponse400> Bad Request
   * @throws FetchError<449, types.LeaderboardsResponse449> Error - not ready
   */
  leaderboards(metadata?: types.LeaderboardsMetadataParam): Promise<FetchResponse<200, types.LeaderboardsResponse200>> {
    return this.core.fetch('/v1/analytics/leaderboards', 'get', metadata);
  }

  /**
   * Returns a list of tuples in the form of ["word", count] which represents the number of
   * times a word appears in the text of Bonuses. The list is sorted from most common word to
   * least common word.
   *
   * @summary Popular Words
   * @throws FetchError<449, types.GetV1AnalyticsWordsResponse449> Data not ready
   */
  getV1AnalyticsWords(metadata?: types.GetV1AnalyticsWordsMetadataParam): Promise<FetchResponse<200, types.GetV1AnalyticsWordsResponse200>> {
    return this.core.fetch('/v1/analytics/words', 'get', metadata);
  }

  /**
   * This is the giving, receiving, and participation (giving or receiving) rate for each
   * user segment of your company. Rates are either monthly or weekly and cover the
   * previously completed 24 months.
   *
   * @summary Participation Rates
   * @throws FetchError<401, types.GetV1DataLayerParticipationResponse401> An error occurred.
   */
  getV1Data_layerParticipation(metadata?: types.GetV1DataLayerParticipationMetadataParam): Promise<FetchResponse<200, types.GetV1DataLayerParticipationResponse200>> {
    return this.core.fetch('/v1/data_layer/participation', 'get', metadata);
  }

  /**
   * This is the count of recognition received by users. Recognition includes peer to peer
   * recognition, awards, and add-ons. If multiple users were recognized in a single post,
   * recognition of each recipient is counted separately. Totals are monthly and cover the
   * previously completed 24 months.
   *
   * @summary Recognition Received
   */
  getV1Data_layerRecognitionBonuses_received(metadata?: types.GetV1DataLayerRecognitionBonusesReceivedMetadataParam): Promise<FetchResponse<200, types.GetV1DataLayerRecognitionBonusesReceivedResponse200>> {
    return this.core.fetch('/v1/data_layer/recognition/bonuses_received', 'get', metadata);
  }

  /**
   * This is the rate at which users gave or received recognition. Only returns the past 24
   * months.
   *
   * @summary Recognition Rates
   */
  getV1Data_layerRecognitionRates(metadata?: types.GetV1DataLayerRecognitionRatesMetadataParam): Promise<FetchResponse<200, types.GetV1DataLayerRecognitionRatesResponse200>> {
    return this.core.fetch('/v1/data_layer/recognition/rates', 'get', metadata);
  }

  /**
   * These are the rates at which users gave or received recognition. Rates are monthly per
   * user and broken down by the custom properties you have imported into Bonusly (eg.
   * Department, Location, and  Manager’s Team). Data covers the previously completed 24
   * months.
   *
   * @summary Compare Recognition Rates
   */
  getV1Data_layerRecognitionCompare_rates(metadata?: types.GetV1DataLayerRecognitionCompareRatesMetadataParam): Promise<FetchResponse<200, types.GetV1DataLayerRecognitionCompareRatesResponse200>> {
    return this.core.fetch('/v1/data_layer/recognition/compare_rates', 'get', metadata);
  }

  /**
   * This counts the number of times hashtags were received by users. Totals are monthly and
   * cover the previously completed 24 months.
   *
   * @summary Hashtags Received
   */
  getV1Data_layerRecognitionHashtags_all(metadata?: types.GetV1DataLayerRecognitionHashtagsAllMetadataParam): Promise<FetchResponse<200, types.GetV1DataLayerRecognitionHashtagsAllResponse200>> {
    return this.core.fetch('/v1/data_layer/recognition/hashtags_all', 'get', metadata);
  }

  /**
   * This counts the number of times hashtags set as Company Values were received by users.
   * Totals are monthly and cover the previously completed 24 months.
   *
   * @summary Company Value Hashtags Received
   */
  getV1Data_layerRecognitionHashtags_core_value(metadata?: types.GetV1DataLayerRecognitionHashtagsCoreValueMetadataParam): Promise<FetchResponse<200, types.GetV1DataLayerRecognitionHashtagsCoreValueResponse200>> {
    return this.core.fetch('/v1/data_layer/recognition/hashtags_core_value', 'get', metadata);
  }

  /**
   * This is the count of points received by users. Points received include peer to peer
   * recognition, awards, and add-ons. Totals are monthly and cover the previously completed
   * 24 months.
   *
   * @summary Points Received
   */
  getV1Data_layerRecognitionPoints_received(metadata?: types.GetV1DataLayerRecognitionPointsReceivedMetadataParam): Promise<FetchResponse<200, types.GetV1DataLayerRecognitionPointsReceivedResponse200>> {
    return this.core.fetch('/v1/data_layer/recognition/points_received', 'get', metadata);
  }

  /**
   * This counts the number of active users in your account. Active users include any user
   * that was active for at least one day. Totals are monthly and cover the previously
   * completed 24 months.
   *
   * @summary User Count
   */
  getV1Data_layerRecognitionUser_count(metadata?: types.GetV1DataLayerRecognitionUserCountMetadataParam): Promise<FetchResponse<200, types.GetV1DataLayerRecognitionUserCountResponse200>> {
    return this.core.fetch('/v1/data_layer/recognition/user_count', 'get', metadata);
  }

  /**
   * This is the rate at which recognition posts are echoed by another user's add-on
   * recognition.
   *
   * @summary Recognition Add-ons
   */
  getV1Data_layerRecognitionAddons(metadata?: types.GetV1DataLayerRecognitionAddonsMetadataParam): Promise<FetchResponse<200, types.GetV1DataLayerRecognitionAddonsResponse200>> {
    return this.core.fetch('/v1/data_layer/recognition/addons', 'get', metadata);
  }

  /**
   * List API Keys
   *
   * @throws FetchError<404, types.ListApiKeysResponse404> Not Found
   */
  listAPIKeys(metadata?: types.ListApiKeysMetadataParam): Promise<FetchResponse<200, types.ListApiKeysResponse200>> {
    return this.core.fetch('/v1/api_keys/', 'get', metadata);
  }

  /**
   * Create API Key
   *
   * @throws FetchError<400, types.CreateApiKeyResponse400> Bad Request
   * @throws FetchError<401, types.CreateApiKeyResponse401> Unauthorized
   */
  createAPIKey(metadata: types.CreateApiKeyMetadataParam): Promise<FetchResponse<201, types.CreateApiKeyResponse201>> {
    return this.core.fetch('/v1/api_keys/', 'post', metadata);
  }

  /**
   * Cancel API Key
   *
   * @throws FetchError<401, types.CancelApiKeyResponse401> Unauthorized
   */
  cancelAPIKey(metadata: types.CancelApiKeyMetadataParam): Promise<FetchResponse<200, types.CancelApiKeyResponse200>> {
    return this.core.fetch('/v1/api_keys/{id}', 'delete', metadata);
  }

  /**
   * List Bonuses
   *
   */
  listBonuses(metadata?: types.ListBonusesMetadataParam): Promise<FetchResponse<200, types.ListBonusesResponse200>> {
    return this.core.fetch('/v1/bonuses', 'get', metadata);
  }

  /**
   * Create a Bonus
   *
   * @summary Create a Bonus
   */
  createABonus(body: types.CreateABonusBodyParam): Promise<FetchResponse<200, types.CreateABonusResponse200>> {
    return this.core.fetch('/v1/bonuses', 'post', body);
  }

  /**
   * Retrieve a Bonus
   *
   * @throws FetchError<404, types.RetrieveABonusResponse404> Not Found
   */
  retrieveABonus(metadata: types.RetrieveABonusMetadataParam): Promise<FetchResponse<200, types.RetrieveABonusResponse200>> {
    return this.core.fetch('/v1/bonuses/{id}', 'get', metadata);
  }

  /**
   * Update a Bonus
   *
   * @throws FetchError<400, types.UpdateABonusResponse400> Bad Request
   * @throws FetchError<403, types.UpdateABonusResponse403> Forbidden
   * @throws FetchError<404, types.UpdateABonusResponse404> Not Found
   */
  updateABonus(body: types.UpdateABonusBodyParam, metadata: types.UpdateABonusMetadataParam): Promise<FetchResponse<200, types.UpdateABonusResponse200>>;
  updateABonus(metadata: types.UpdateABonusMetadataParam): Promise<FetchResponse<200, types.UpdateABonusResponse200>>;
  updateABonus(body?: types.UpdateABonusBodyParam | types.UpdateABonusMetadataParam, metadata?: types.UpdateABonusMetadataParam): Promise<FetchResponse<200, types.UpdateABonusResponse200>> {
    return this.core.fetch('/v1/bonuses/{id}', 'put', body, metadata);
  }

  /**
   * Delete a Bonus
   *
   * @throws FetchError<400, types.DeleteABonusResponse400> Bad Request
   * @throws FetchError<403, types.DeleteABonusResponse403> Forbidden
   * @throws FetchError<404, types.DeleteABonusResponse404> Not Found
   */
  deleteABonus(metadata: types.DeleteABonusMetadataParam): Promise<FetchResponse<200, types.DeleteABonusResponse200>> {
    return this.core.fetch('/v1/bonuses/{id}', 'delete', metadata);
  }

  /**
   * Get a list of bonuses as an ATOM RSS Feed by adding the extension .atom to the normal
   * bonuses 'Index' API call.
   *
   * @summary XML List Bonuses
   */
  xMLListBonuses(metadata?: types.XMlListBonusesMetadataParam): Promise<FetchResponse<200, types.XMlListBonusesResponse200>> {
    return this.core.fetch('/v1/bonuses.atom', 'get', metadata);
  }

  /**
   * Retrieve a Company
   *
   */
  retrieveACompany(): Promise<FetchResponse<200, types.RetrieveACompanyResponse200>> {
    return this.core.fetch('/v1/companies/show', 'get');
  }

  /**
   * [ADMIN] Update a Company
   *
   * @throws FetchError<400, types.ADminUpdateACompanyResponse400> Bad Request
   * @throws FetchError<403, types.ADminUpdateACompanyResponse403> Forbidden
   */
  aDMINUpdateACompany(body?: types.ADminUpdateACompanyBodyParam): Promise<FetchResponse<200, types.ADminUpdateACompanyResponse200>> {
    return this.core.fetch('/v1/companies/update', 'post', body);
  }

  /**
   * List Redemptions
   *
   * @throws FetchError<400, types.ListRedemptionsResponse400> Bad Request
   */
  listRedemptions(metadata?: types.ListRedemptionsMetadataParam): Promise<FetchResponse<200, types.ListRedemptionsResponse200>> {
    return this.core.fetch('/v1/redemptions', 'get', metadata);
  }

  /**
   * Retrieve a Redemption
   *
   * @throws FetchError<404, types.RetrieveARedemptionResponse404> Not Found
   */
  retrieveARedemption(metadata: types.RetrieveARedemptionMetadataParam): Promise<FetchResponse<200, types.RetrieveARedemptionResponse200>> {
    return this.core.fetch('/v1/redemptions/{id}', 'get', metadata);
  }

  /**
   * List Rewards
   *
   * @throws FetchError<400, types.ListRewardsResponse400> Bad Request
   */
  listRewards(metadata?: types.ListRewardsMetadataParam): Promise<FetchResponse<200, types.ListRewardsResponse200>> {
    return this.core.fetch('/v1/rewards', 'get', metadata);
  }

  /**
   * Retrieve a Reward
   *
   * @throws FetchError<404, types.RetrieveARewardResponse404> Not Found
   */
  retrieveAReward(metadata: types.RetrieveARewardMetadataParam): Promise<FetchResponse<200, types.RetrieveARewardResponse200>> {
    return this.core.fetch('/v1/rewards/{id}', 'get', metadata);
  }

  /**
   * List custom reward redemptions
   *
   * @summary List Custom Rewards Redemptions
   * @throws FetchError<400, types.ListCustomRewardsRedemptionsResponse400> Bad Request
   */
  listCustomRewardsRedemptions(metadata?: types.ListCustomRewardsRedemptionsMetadataParam): Promise<FetchResponse<200, types.ListCustomRewardsRedemptionsResponse200>> {
    return this.core.fetch('/v1/custom_rewards_redemptions', 'get', metadata);
  }

  /**
   * Approve multiple custom reward redemptions at once
   *
   * @summary Approve Custom Reward Redemptions
   * @throws FetchError<422, types.ApproveCustomRewardRedemptionsResponse422> Unprocessable Entity
   */
  approveCustomRewardRedemptions(body?: types.ApproveCustomRewardRedemptionsBodyParam): Promise<FetchResponse<200, types.ApproveCustomRewardRedemptionsResponse200>> {
    return this.core.fetch('/v1/custom_rewards_redemptions/approve', 'post', body);
  }

  /**
   * Fulfill multiple custom reward redemptions at once
   *
   * @summary Fulfill Custom Reward Redemptions
   * @throws FetchError<422, types.FulfillCustomRewardRedemptionsResponse422> Unprocessable Entity
   */
  fulfillCustomRewardRedemptions(body?: types.FulfillCustomRewardRedemptionsBodyParam): Promise<FetchResponse<200, types.FulfillCustomRewardRedemptionsResponse200>> {
    return this.core.fetch('/v1/custom_rewards_redemptions/fulfill', 'post', body);
  }

  /**
   * List Users
   *
   */
  listUsers(metadata?: types.ListUsersMetadataParam): Promise<FetchResponse<200, types.ListUsersResponse200>> {
    return this.core.fetch('/v1/users', 'get', metadata);
  }

  /**
   * Create a new user in Bonusly. If a deactivated user with the same `userName`
   * is found that user will be reactivated and updated to match any passed in
   * attributes. If a user already exists with the specified `userName` the API will
   * return a 409.
   *
   * + Parameters:
   *     + userName (string, required) - A unique identifier for the user. *This will
   *     be imported into Bonusly as the user's `email`*.
   *     + name.givenName (string, optional) - *This will be imported into Bonusly as
   *     the user's `firstName`*.
   *     + name.familyName (string, optional) - *This will be imported into Bonusly as
   *     the user's `lastName`*.
   *     + externalId (string, optional) - *This will be imported into Bonusly as the user's
   *     `external_unique_id`*.
   *    + urn:scim:schemas:extension:enterprise:1.0.department (string, optional) -
   *     *This will be imported into Bonusly as the user's `department` custom property*.
   *     + urn:scim:schemas:extension:bonusly:1.0:User.location (string, optional) -
   *     *This will be imported into Bonusly as the user's `location` custom property*.
   *     + urn:scim:schemas:extension:bonusly:1.0:User.employee_id (string, optional) -
   *     *This will be imported into Bonusly as the user's `employee_id` custom property*.
   *     + urn:scim:schemas:extension:bonusly:1.0:User.role (string, optional) -
   *     *This will be imported into Bonusly as the user's `role` custom property*.
   *     + urn:scim:schemas:extension:bonusly:1.0:User.job_title (string, optional) -
   *     *This will be imported into Bonusly as the user's `job_title` custom property*.
   *     + urn:scim:schemas:extension:bonusly:1.0:User.division (string, optional) -
   *     *This will be imported into Bonusly as the user's `division` custom property*.
   *     + urn:scim:schemas:extension:bonusly:1.0:User.business_unit (string, optional) -
   *     *This will be imported into Bonusly as the user's `business_unit` custom property*.
   *     + urn:scim:schemas:extension:bonusly:1.0:User.user_mode (string, optional) -
   *     *This will be imported into Bonusly as the user's `user_mode` - defaults to
   * "normal", can be "benefactor" or "receiver"*.
   *     + urn:scim:schemas:extension:bonusly:1.0:User.manager_email (string, optional) -
   *     *This will be imported into Bonusly as the user's `manager_email` - this will set
   * the user's manager to the existing user with the matching e-mail address*.
   *     + urn:scim:schemas:extension:bonusly:1.0:User.hired_on (string, optional) - format:
   * YYYY-MM-DD
   *     *This will be imported into Bonusly as the user's `hired_on`*.
   *     + urn:scim:schemas:extension:bonusly:1.0:User.date_of_birth (string, optional) -
   * format: YYYY-MM-DD.
   *     *This will be imported into Bonusly as the user's `date_of_birth`. Bonusly only
   * stores the month and day. The year will be stripped*.
   *
   * @summary Create a user
   */
  createAUser(body?: types.CreateAUserBodyParam): Promise<FetchResponse<200, types.CreateAUserResponse200>> {
    return this.core.fetch('/scim11/Users', 'post', body);
  }

  /**
   * Retrieve a User
   *
   * @throws FetchError<404, types.RetrieveAUserResponse404> Not Found
   */
  retrieveAUser(metadata: types.RetrieveAUserMetadataParam): Promise<FetchResponse<200, types.RetrieveAUserResponse200>> {
    return this.core.fetch('/v1/users/{id}', 'get', metadata);
  }

  /**
   * Update an active, existing user in Bonusly. If a user already exists with the
   * specified `userName` the API will return a 409.
   *
   * + Parameters:
   *     + userName (string, required) - A unique identifier for the user. *This will
   *     be imported into Bonusly as the user's `email`*.
   *     + name.givenName (string, optional) - *This will be imported into Bonusly as
   *     the user's `firstName`*.
   *     + name.familyName (string, optional) - *This will be imported into Bonusly as
   *     the user's `lastName`*.
   *     + addresses.country (string, optional) - *This will be imported into Bonusly as
   *     the user's `country` when addresses.type is work*.
   *     + externalId (string, optional) - *This will be imported into Bonusly as the user's
   *     `external_unique_id`*.
   *     + urn:scim:schemas:extension:enterprise:1.0.department (string, optional) -
   *     *This will be imported into Bonusly as the user's `department` custom property*.
   *     + urn:scim:schemas:extension:bonusly:1.0:User.location (string, optional) -
   *     *This will be imported into Bonusly as the user's `location` custom property*.
   *     + urn:scim:schemas:extension:bonusly:1.0:User.employee_id (string, optional) -
   *     *This will be imported into Bonusly as the user's `employee_id` custom property*.
   *     + urn:scim:schemas:extension:bonusly:1.0:User.role (string, optional) -
   *     *This will be imported into Bonusly as the user's `role` custom property*.
   *     + urn:scim:schemas:extension:bonusly:1.0:User.job_title (string, optional) -
   *     *This will be imported into Bonusly as the user's `job_title` custom property*.
   *     + urn:scim:schemas:extension:bonusly:1.0:User.division (string, optional) -
   *     *This will be imported into Bonusly as the user's `division` custom property*.
   *     + urn:scim:schemas:extension:bonusly:1.0:User.business_unit (string, optional) -
   *     *This will be imported into Bonusly as the user's `business_unit` custom property*.
   *     *This will be imported into Bonusly as the user's `user_mode` - defaults to
   * "normal", can be "benefactor" or "receiver"*.
   *     + urn:scim:schemas:extension:bonusly:1.0:User.manager_email (string, optional) -
   *     *This will be imported into Bonusly as the user's `manager_email` - this will set
   * the user's manager to the existing user with the matching e-mail address*.
   *     + urn:scim:schemas:extension:bonusly:1.0:User.hired_on (string, optional) - format:
   * YYYY-MM-DD
   *     *This will be imported into Bonusly as the user's `hired_on`*.
   *     + urn:scim:schemas:extension:bonusly:1.0:User.date_of_birth (string, optional) -
   * format: YYYY-MM-DD.
   *     *This will be imported into Bonusly as the user's `date_of_birth`. Bonusly only
   * stores the month and day. The year will be stripped*.
   *
   * @summary Update an existing user
   */
  updateAnExistingUser(body: types.UpdateAnExistingUserBodyParam, metadata: types.UpdateAnExistingUserMetadataParam): Promise<FetchResponse<200, types.UpdateAnExistingUserResponse200>>;
  updateAnExistingUser(metadata: types.UpdateAnExistingUserMetadataParam): Promise<FetchResponse<200, types.UpdateAnExistingUserResponse200>>;
  updateAnExistingUser(body?: types.UpdateAnExistingUserBodyParam | types.UpdateAnExistingUserMetadataParam, metadata?: types.UpdateAnExistingUserMetadataParam): Promise<FetchResponse<200, types.UpdateAnExistingUserResponse200>> {
    return this.core.fetch('/scim11/Users/{id}', 'put', body, metadata);
  }

  /**
   * Activate or deactivate a user in Bonusly.
   *
   * + Parameters:
   *     + active (boolean, optional) - Set to `true` to activate a user, set to
   *     `false` to deactivate a user.
   *       + Default: false
   *
   * @summary Activate or deactivate a user
   */
  activateOrDeactivateAUser(body: types.ActivateOrDeactivateAUserBodyParam, metadata: types.ActivateOrDeactivateAUserMetadataParam): Promise<FetchResponse<204, types.ActivateOrDeactivateAUserResponse204>>;
  activateOrDeactivateAUser(metadata: types.ActivateOrDeactivateAUserMetadataParam): Promise<FetchResponse<204, types.ActivateOrDeactivateAUserResponse204>>;
  activateOrDeactivateAUser(body?: types.ActivateOrDeactivateAUserBodyParam | types.ActivateOrDeactivateAUserMetadataParam, metadata?: types.ActivateOrDeactivateAUserMetadataParam): Promise<FetchResponse<204, types.ActivateOrDeactivateAUserResponse204>> {
    return this.core.fetch('/scim11/Users/{id}', 'delete', body, metadata);
  }

  /**
   * Get metadata about the Bonusly SCIM API
   *
   */
  getMetadataAboutTheBonuslySCIMAPI(): Promise<FetchResponse<200, types.GetMetadataAboutTheBonuslyScimapiResponse200>> {
    return this.core.fetch('/scim11/ServiceProviderConfigs', 'get');
  }

  /**
   * List the SCIM resource types supported by Bonusly
   *
   */
  listTheSCIMResourceTypesSupportedByBonusly(): Promise<FetchResponse<200, types.ListTheScimResourceTypesSupportedByBonuslyResponse200>> {
    return this.core.fetch('/scim11/ResourceTypes', 'get');
  }

  /**
   * List the SCIM schemas supported by Bonusly
   *
   */
  listTheSCIMSchemasSupportedByBonusly(): Promise<FetchResponse<200, types.ListTheScimSchemasSupportedByBonuslyResponse200>> {
    return this.core.fetch('/scim11/Schemas', 'get');
  }

  /**
   * [ADMIN] Create a User
   *
   * @throws FetchError<400, types.ADminCreateAUserResponse400> Bad Request
   * @throws FetchError<403, types.ADminCreateAUserResponse403> Forbidden
   */
  aDMINCreateAUser(metadata: types.ADminCreateAUserMetadataParam): Promise<FetchResponse<200, types.ADminCreateAUserResponse200>> {
    return this.core.fetch('/v1/users', 'post', metadata);
  }

  /**
   * [ADMIN] Update a User
   *
   * @throws FetchError<400, types.ADminUpdateAUserResponse400> Bad Request
   * @throws FetchError<403, types.ADminUpdateAUserResponse403> Forbidden
   * @throws FetchError<404, types.ADminUpdateAUserResponse404> Not Found
   */
  aDMINUpdateAUser(body: types.ADminUpdateAUserBodyParam, metadata: types.ADminUpdateAUserMetadataParam): Promise<FetchResponse<200, types.ADminUpdateAUserResponse200>>;
  aDMINUpdateAUser(metadata: types.ADminUpdateAUserMetadataParam): Promise<FetchResponse<200, types.ADminUpdateAUserResponse200>>;
  aDMINUpdateAUser(body?: types.ADminUpdateAUserBodyParam | types.ADminUpdateAUserMetadataParam, metadata?: types.ADminUpdateAUserMetadataParam): Promise<FetchResponse<200, types.ADminUpdateAUserResponse200>> {
    return this.core.fetch('/v1/users/{id}', 'put', body, metadata);
  }

  /**
   * [ADMIN] Deactivate a User
   *
   * @throws FetchError<400, types.ADminDeactivateAUserResponse400> Bad Request
   * @throws FetchError<403, types.ADminDeactivateAUserResponse403> Forbidden
   * @throws FetchError<404, types.ADminDeactivateAUserResponse404> Not Found
   */
  aDMINDeactivateAUser(metadata: types.ADminDeactivateAUserMetadataParam): Promise<FetchResponse<200, types.ADminDeactivateAUserResponse200>> {
    return this.core.fetch('/v1/users/{id}', 'delete', metadata);
  }

  /**
   * Me
   *
   */
  me(): Promise<FetchResponse<200, types.MeResponse200>> {
    return this.core.fetch('/v1/users/me', 'get');
  }

  /**
   * Autocomplete
   *
   * @throws FetchError<400, types.AutocompleteResponse400> Bad Request
   */
  autocomplete(metadata: types.AutocompleteMetadataParam): Promise<FetchResponse<200, types.AutocompleteResponse200>> {
    return this.core.fetch('/v1/users/autocomplete', 'get', metadata);
  }

  /**
   * User's Bonuses
   *
   * @throws FetchError<400, types.BonusesResponse400> Out of range
   * @throws FetchError<404, types.BonusesResponse404> Not Found
   */
  bonuses(metadata: types.BonusesMetadataParam): Promise<FetchResponse<200, types.BonusesResponse200>> {
    return this.core.fetch('/v1/users/{id}/bonuses', 'get', metadata);
  }

  /**
   * User's Achievements
   *
   * @throws FetchError<404, types.AchievementsResponse404> Not Found
   */
  achievements(metadata: types.AchievementsMetadataParam): Promise<FetchResponse<200, types.AchievementsResponse200>> {
    return this.core.fetch('/v1/users/{id}/achievements', 'get', metadata);
  }

  /**
   * User's Redemptions
   *
   * @throws FetchError<400, types.RedemptionsResponse400> Out of range
   * @throws FetchError<403, types.RedemptionsResponse403> Forbidden
   * @throws FetchError<404, types.RedemptionsResponse404> Not Found
   */
  redemptions(metadata: types.RedemptionsMetadataParam): Promise<FetchResponse<200, types.RedemptionsResponse200>> {
    return this.core.fetch('/v1/users/{id}/redemptions', 'get', metadata);
  }

  /**
   * Create a Redemption
   *
   * @throws FetchError<400, types.CreateARedemptionResponse400> Bad Request
   * @throws FetchError<403, types.CreateARedemptionResponse403> Forbidden
   * @throws FetchError<404, types.CreateARedemptionResponse404> Not Found
   */
  createARedemption(body: types.CreateARedemptionBodyParam, metadata: types.CreateARedemptionMetadataParam): Promise<FetchResponse<200, types.CreateARedemptionResponse200>>;
  createARedemption(metadata: types.CreateARedemptionMetadataParam): Promise<FetchResponse<200, types.CreateARedemptionResponse200>>;
  createARedemption(body?: types.CreateARedemptionBodyParam | types.CreateARedemptionMetadataParam, metadata?: types.CreateARedemptionMetadataParam): Promise<FetchResponse<200, types.CreateARedemptionResponse200>> {
    return this.core.fetch('/v1/users/{id}/redemptions', 'post', body, metadata);
  }

  /**
   * List Webhooks
   *
   */
  listWebhooks(): Promise<FetchResponse<200, types.ListWebhooksResponse200>> {
    return this.core.fetch('/v1/webhooks', 'get');
  }

  /**
   * Create a webhook. Pass the following arguments in the request body:
   *
   * - url (string, required) - The URL you want Bonusly to POST to, eg
   * "https://foobarbaz.com".
   *
   * - event_types (array, optional) - The array of event types you want to be notified of.
   * If present, it can only contain the strings "bonus.created" and/or
   * "achievement_event.created".
   *
   * @summary Create Webhook
   * @throws FetchError<400, types.CreateWebhookResponse400> Bad Request
   */
  createWebhook(body?: types.CreateWebhookBodyParam): Promise<FetchResponse<200, types.CreateWebhookResponse200>> {
    return this.core.fetch('/v1/webhooks', 'post', body);
  }

  /**
   * Update the url or event types a webhook is subscribed to. Pass the following arguments
   * in the request body:
   *
   * - url (string, required) - The URL you want Bonusly to POST to, eg
   * "https://foobarbaz.com".
   *
   * - event_types (array, optional) - The array of event types you want to be notified of.
   * If present, it can only contain the strings "bonus.created" and/or
   * "achievement_event.created".
   *
   * @summary Update Webhook
   * @throws FetchError<400, types.UpdateWebhookResponse400> Bad Request
   */
  updateWebhook(metadata: types.UpdateWebhookMetadataParam): Promise<FetchResponse<200, types.UpdateWebhookResponse200>> {
    return this.core.fetch('/v1/webhooks/{id}', 'put', metadata);
  }

  /**
   * Remove Webhook
   *
   * @throws FetchError<404, types.RemoveWebhookResponse404> Not Found
   */
  removeWebhook(metadata: types.RemoveWebhookMetadataParam): Promise<FetchResponse<200, types.RemoveWebhookResponse200>> {
    return this.core.fetch('/v1/webhooks/{id}', 'delete', metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { ADminCreateAUserMetadataParam, ADminCreateAUserResponse200, ADminCreateAUserResponse400, ADminCreateAUserResponse403, ADminDeactivateAUserMetadataParam, ADminDeactivateAUserResponse200, ADminDeactivateAUserResponse400, ADminDeactivateAUserResponse403, ADminDeactivateAUserResponse404, ADminUpdateACompanyBodyParam, ADminUpdateACompanyResponse200, ADminUpdateACompanyResponse400, ADminUpdateACompanyResponse403, ADminUpdateAUserBodyParam, ADminUpdateAUserMetadataParam, ADminUpdateAUserResponse200, ADminUpdateAUserResponse400, ADminUpdateAUserResponse403, ADminUpdateAUserResponse404, AchievementsMetadataParam, AchievementsResponse200, AchievementsResponse404, ActivateOrDeactivateAUserBodyParam, ActivateOrDeactivateAUserMetadataParam, ActivateOrDeactivateAUserResponse204, ApproveCustomRewardRedemptionsBodyParam, ApproveCustomRewardRedemptionsResponse200, ApproveCustomRewardRedemptionsResponse422, AutocompleteMetadataParam, AutocompleteResponse200, AutocompleteResponse400, BonusesMetadataParam, BonusesResponse200, BonusesResponse400, BonusesResponse404, CancelApiKeyMetadataParam, CancelApiKeyResponse200, CancelApiKeyResponse401, CreateABonusBodyParam, CreateABonusResponse200, CreateARedemptionBodyParam, CreateARedemptionMetadataParam, CreateARedemptionResponse200, CreateARedemptionResponse400, CreateARedemptionResponse403, CreateARedemptionResponse404, CreateAUserBodyParam, CreateAUserResponse200, CreateApiKeyMetadataParam, CreateApiKeyResponse201, CreateApiKeyResponse400, CreateApiKeyResponse401, CreateWebhookBodyParam, CreateWebhookResponse200, CreateWebhookResponse400, DeleteABonusMetadataParam, DeleteABonusResponse200, DeleteABonusResponse400, DeleteABonusResponse403, DeleteABonusResponse404, FulfillCustomRewardRedemptionsBodyParam, FulfillCustomRewardRedemptionsResponse200, FulfillCustomRewardRedemptionsResponse422, GetMetadataAboutTheBonuslyScimapiResponse200, GetV1AnalyticsWordsMetadataParam, GetV1AnalyticsWordsResponse200, GetV1AnalyticsWordsResponse449, GetV1DataLayerParticipationMetadataParam, GetV1DataLayerParticipationResponse200, GetV1DataLayerParticipationResponse401, GetV1DataLayerRecognitionAddonsMetadataParam, GetV1DataLayerRecognitionAddonsResponse200, GetV1DataLayerRecognitionBonusesReceivedMetadataParam, GetV1DataLayerRecognitionBonusesReceivedResponse200, GetV1DataLayerRecognitionCompareRatesMetadataParam, GetV1DataLayerRecognitionCompareRatesResponse200, GetV1DataLayerRecognitionHashtagsAllMetadataParam, GetV1DataLayerRecognitionHashtagsAllResponse200, GetV1DataLayerRecognitionHashtagsCoreValueMetadataParam, GetV1DataLayerRecognitionHashtagsCoreValueResponse200, GetV1DataLayerRecognitionPointsReceivedMetadataParam, GetV1DataLayerRecognitionPointsReceivedResponse200, GetV1DataLayerRecognitionRatesMetadataParam, GetV1DataLayerRecognitionRatesResponse200, GetV1DataLayerRecognitionUserCountMetadataParam, GetV1DataLayerRecognitionUserCountResponse200, LeaderboardsMetadataParam, LeaderboardsResponse200, LeaderboardsResponse400, LeaderboardsResponse449, ListAchievementsResponse200, ListApiKeysMetadataParam, ListApiKeysResponse200, ListApiKeysResponse404, ListBonusesMetadataParam, ListBonusesResponse200, ListCustomRewardsRedemptionsMetadataParam, ListCustomRewardsRedemptionsResponse200, ListCustomRewardsRedemptionsResponse400, ListRedemptionsMetadataParam, ListRedemptionsResponse200, ListRedemptionsResponse400, ListRewardsMetadataParam, ListRewardsResponse200, ListRewardsResponse400, ListTheScimResourceTypesSupportedByBonuslyResponse200, ListTheScimSchemasSupportedByBonuslyResponse200, ListUsersMetadataParam, ListUsersResponse200, ListWebhooksResponse200, MeResponse200, RedemptionsMetadataParam, RedemptionsResponse200, RedemptionsResponse400, RedemptionsResponse403, RedemptionsResponse404, RemoveWebhookMetadataParam, RemoveWebhookResponse200, RemoveWebhookResponse404, RetrieveABonusMetadataParam, RetrieveABonusResponse200, RetrieveABonusResponse404, RetrieveACompanyResponse200, RetrieveARedemptionMetadataParam, RetrieveARedemptionResponse200, RetrieveARedemptionResponse404, RetrieveARewardMetadataParam, RetrieveARewardResponse200, RetrieveARewardResponse404, RetrieveAUserMetadataParam, RetrieveAUserResponse200, RetrieveAUserResponse404, TrendsResponse200, TrendsResponse449, UpdateABonusBodyParam, UpdateABonusMetadataParam, UpdateABonusResponse200, UpdateABonusResponse400, UpdateABonusResponse403, UpdateABonusResponse404, UpdateAnExistingUserBodyParam, UpdateAnExistingUserMetadataParam, UpdateAnExistingUserResponse200, UpdateWebhookMetadataParam, UpdateWebhookResponse200, UpdateWebhookResponse400, XMlListBonusesMetadataParam, XMlListBonusesResponse200 } from './types';

import { StrategyOptions } from 'passport-google-oauth20';

export type GoogleConfig = Omit<StrategyOptions, 'callbackURL'> & {
  callbackURL: string;
};

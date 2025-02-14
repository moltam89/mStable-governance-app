// Hotfix
/* eslint-disable import/extensions,import/no-unresolved */

import { useMemo } from 'react';

import formatDuration from 'date-fns/formatDuration';
import { useSigner } from '../context/OnboardProvider';
import { Erc20Detailed } from '../typechain/Erc20Detailed';
import { Erc20DetailedFactory } from '../typechain/Erc20DetailedFactory';
import { truncateAddress } from './strings';

export const useTruncatedAddress = (address?: string | null): string | null =>
  useMemo(() => (address ? truncateAddress(address) : null), [address]);

export const useErc20Contract = (
  address: string | null,
): Erc20Detailed | null => {
  const signer = useSigner();
  return useMemo(
    () =>
      signer && address ? Erc20DetailedFactory.connect(address, signer) : null,
    [address, signer],
  );
};

export const useFormatDays = (days: number): string => {
  return useMemo<string>(() => {
    const weeks = Math.floor(days / 7);
    const remainderDays = Math.ceil(days - weeks * 7);
    return formatDuration(
      { weeks, days: remainderDays },
      { format: ['weeks', 'days'], zero: false },
    );
  }, [days]);
};

import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
  local_secret_key(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
  record_values(context: __compactRuntime.WitnessContext<Ledger, PS>,
                record_id_0: Uint8Array): [PS, bigint[]];
  record_salt(context: __compactRuntime.WitnessContext<Ledger, PS>,
              record_id_0: Uint8Array): [PS, Uint8Array];
}

export type ImpureCircuits<PS> = {
  attest(context: __compactRuntime.CircuitContext<PS>, record_id_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, []>>;
  proveField(context: __compactRuntime.CircuitContext<PS>,
             record_id_0: Uint8Array,
             field_index_0: bigint,
             op_0: bigint,
             threshold_0: bigint): Promise<__compactRuntime.CircuitResults<PS, []>>;
}

export type ProvableCircuits<PS> = {
  attest(context: __compactRuntime.CircuitContext<PS>, record_id_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, []>>;
  proveField(context: __compactRuntime.CircuitContext<PS>,
             record_id_0: Uint8Array,
             field_index_0: bigint,
             op_0: bigint,
             threshold_0: bigint): Promise<__compactRuntime.CircuitResults<PS, []>>;
}

export type PureCircuits = {
  ownerIdOf(secret_0: Uint8Array): Uint8Array;
  commitmentOf(values_0: bigint[], salt_0: Uint8Array): Uint8Array;
  claimKeyOf(record_id_0: Uint8Array,
             commitment_0: Uint8Array,
             field_index_0: bigint,
             op_0: bigint,
             threshold_0: bigint): Uint8Array;
}

export type Circuits<PS> = {
  ownerIdOf(context: __compactRuntime.CircuitContext<PS>, secret_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, Uint8Array>>;
  commitmentOf(context: __compactRuntime.CircuitContext<PS>,
               values_0: bigint[],
               salt_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, Uint8Array>>;
  claimKeyOf(context: __compactRuntime.CircuitContext<PS>,
             record_id_0: Uint8Array,
             commitment_0: Uint8Array,
             field_index_0: bigint,
             op_0: bigint,
             threshold_0: bigint): Promise<__compactRuntime.CircuitResults<PS, Uint8Array>>;
  attest(context: __compactRuntime.CircuitContext<PS>, record_id_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, []>>;
  proveField(context: __compactRuntime.CircuitContext<PS>,
             record_id_0: Uint8Array,
             field_index_0: bigint,
             op_0: bigint,
             threshold_0: bigint): Promise<__compactRuntime.CircuitResults<PS, []>>;
}

export type Ledger = {
  attestations: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): { owner: Uint8Array, commitment: Uint8Array };
    [Symbol.iterator](): Iterator<[Uint8Array, { owner: Uint8Array, commitment: Uint8Array }]>
  };
  claims: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): { record_id: Uint8Array,
                                 field_index: bigint,
                                 op: bigint,
                                 threshold: bigint
                               };
    [Symbol.iterator](): Iterator<[Uint8Array, { record_id: Uint8Array, field_index: bigint, op: bigint, threshold: bigint }]>
  };
  readonly attested: bigint;
}

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): Promise<__compactRuntime.ConstructorResult<PS>>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
export declare const expectedVk: Record<string, string>;
export declare const circuitSignatures: __compactRuntime.CircuitSignatures;
export declare const declaredInterfaces: __compactRuntime.DeclaredInterfaces;

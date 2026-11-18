import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
__compactRuntime.checkRuntimeVersion('0.21.0');

const _descriptor_0 = new __compactRuntime.CompactTypeBytes(32);

class _Attestation_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment());
  }
  fromValue(value_0) {
    return {
      owner: _descriptor_0.fromValue(value_0),
      commitment: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.owner).concat(_descriptor_0.toValue(value_0.commitment));
  }
}

const _descriptor_1 = new _Attestation_0();

const _descriptor_2 = __compactRuntime.CompactTypeBoolean;

const _descriptor_3 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

const _descriptor_4 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

const _descriptor_5 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

class _Claim_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_4.alignment().concat(_descriptor_4.alignment().concat(_descriptor_5.alignment())));
  }
  fromValue(value_0) {
    return {
      record_id: _descriptor_0.fromValue(value_0),
      field_index: _descriptor_4.fromValue(value_0),
      op: _descriptor_4.fromValue(value_0),
      threshold: _descriptor_5.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.record_id).concat(_descriptor_4.toValue(value_0.field_index).concat(_descriptor_4.toValue(value_0.op).concat(_descriptor_5.toValue(value_0.threshold))));
  }
}

const _descriptor_6 = new _Claim_0();

const _descriptor_7 = new __compactRuntime.CompactTypeVector(4, _descriptor_5);

class _ClaimKey_0 {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_4.alignment().concat(_descriptor_4.alignment().concat(_descriptor_5.alignment())))));
  }
  fromValue(value_0) {
    return {
      tag: _descriptor_4.fromValue(value_0),
      record_id: _descriptor_0.fromValue(value_0),
      commitment: _descriptor_0.fromValue(value_0),
      field_index: _descriptor_4.fromValue(value_0),
      op: _descriptor_4.fromValue(value_0),
      threshold: _descriptor_5.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0.tag).concat(_descriptor_0.toValue(value_0.record_id).concat(_descriptor_0.toValue(value_0.commitment).concat(_descriptor_4.toValue(value_0.field_index).concat(_descriptor_4.toValue(value_0.op).concat(_descriptor_5.toValue(value_0.threshold))))));
  }
}

const _descriptor_8 = new _ClaimKey_0();

const _descriptor_9 = __compactRuntime.CompactTypeField;

class _RecordOpening_0 {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_5.alignment().concat(_descriptor_5.alignment().concat(_descriptor_5.alignment().concat(_descriptor_5.alignment().concat(_descriptor_0.alignment())))));
  }
  fromValue(value_0) {
    return {
      tag: _descriptor_4.fromValue(value_0),
      v0: _descriptor_5.fromValue(value_0),
      v1: _descriptor_5.fromValue(value_0),
      v2: _descriptor_5.fromValue(value_0),
      v3: _descriptor_5.fromValue(value_0),
      salt: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0.tag).concat(_descriptor_5.toValue(value_0.v0).concat(_descriptor_5.toValue(value_0.v1).concat(_descriptor_5.toValue(value_0.v2).concat(_descriptor_5.toValue(value_0.v3).concat(_descriptor_0.toValue(value_0.salt))))));
  }
}

const _descriptor_10 = new _RecordOpening_0();

class _Either_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_2.fromValue(value_0),
      left: _descriptor_0.fromValue(value_0),
      right: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.is_left).concat(_descriptor_0.toValue(value_0.left).concat(_descriptor_0.toValue(value_0.right)));
  }
}

const _descriptor_11 = new _Either_0();

const _descriptor_12 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

class _ContractAddress_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_13 = new _ContractAddress_0();

class _UserAddress_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_14 = new _UserAddress_0();

class _Either_1 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_13.alignment().concat(_descriptor_14.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_2.fromValue(value_0),
      left: _descriptor_13.fromValue(value_0),
      right: _descriptor_14.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.is_left).concat(_descriptor_13.toValue(value_0.left).concat(_descriptor_14.toValue(value_0.right)));
  }
}

const _descriptor_15 = new _Either_1();

class _Maybe_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_15.alignment());
  }
  fromValue(value_0) {
    return {
      is_some: _descriptor_2.fromValue(value_0),
      value: _descriptor_15.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.is_some).concat(_descriptor_15.toValue(value_0.value));
  }
}

const _descriptor_16 = new _Maybe_0();

const _descriptor_17 = new __compactRuntime.CompactTypeUnsignedInteger(4294967295n, 4);

export class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    if (typeof(witnesses_0.local_secret_key) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named local_secret_key');
    }
    if (typeof(witnesses_0.record_values) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named record_values');
    }
    if (typeof(witnesses_0.record_salt) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named record_salt');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      async ownerIdOf(context, ...args_1) {
        return { result: pureCircuits.ownerIdOf(...args_1), context };
      },
      async commitmentOf(context, ...args_1) {
        return { result: pureCircuits.commitmentOf(...args_1), context };
      },
      async claimKeyOf(context, ...args_1) {
        return { result: pureCircuits.claimKeyOf(...args_1), context };
      },
      attest: async (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`attest: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const record_id_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.callContext.currentQueryContext != undefined)) {
          __compactRuntime.typeError('attest',
                                     'argument 1 (as invoked from Typescript)',
                                     'mini-vault.compact line 116 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(record_id_0.buffer instanceof ArrayBuffer && record_id_0.BYTES_PER_ELEMENT === 1 && record_id_0.length === 32)) {
          __compactRuntime.typeError('attest',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'mini-vault.compact line 116 char 1',
                                     'Bytes<32>',
                                     record_id_0)
        }
        const context = __compactRuntime.copyCircuitContext(contextOrig_0);
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(record_id_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = await this._attest_0(context,
                                              partialProofData,
                                              record_id_0);
        partialProofData.output = { value: [], alignment: [] };
        __compactRuntime.finalizeCallProofData(context, partialProofData);
        return { result: result_0, context: context, gasCost: context.callContext.currentGasCost };
      },
      proveField: async (...args_1) => {
        if (args_1.length !== 5) {
          throw new __compactRuntime.CompactError(`proveField: expected 5 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const record_id_0 = args_1[1];
        const field_index_0 = args_1[2];
        const op_0 = args_1[3];
        const threshold_0 = args_1[4];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.callContext.currentQueryContext != undefined)) {
          __compactRuntime.typeError('proveField',
                                     'argument 1 (as invoked from Typescript)',
                                     'mini-vault.compact line 129 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(record_id_0.buffer instanceof ArrayBuffer && record_id_0.BYTES_PER_ELEMENT === 1 && record_id_0.length === 32)) {
          __compactRuntime.typeError('proveField',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'mini-vault.compact line 129 char 1',
                                     'Bytes<32>',
                                     record_id_0)
        }
        if (!(typeof(field_index_0) === 'bigint' && field_index_0 >= 0n && field_index_0 <= 255n)) {
          __compactRuntime.typeError('proveField',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'mini-vault.compact line 129 char 1',
                                     'Uint<0..256>',
                                     field_index_0)
        }
        if (!(typeof(op_0) === 'bigint' && op_0 >= 0n && op_0 <= 255n)) {
          __compactRuntime.typeError('proveField',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'mini-vault.compact line 129 char 1',
                                     'Uint<0..256>',
                                     op_0)
        }
        if (!(typeof(threshold_0) === 'bigint' && threshold_0 >= 0n && threshold_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('proveField',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'mini-vault.compact line 129 char 1',
                                     'Uint<0..18446744073709551616>',
                                     threshold_0)
        }
        const context = __compactRuntime.copyCircuitContext(contextOrig_0);
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(record_id_0).concat(_descriptor_4.toValue(field_index_0).concat(_descriptor_4.toValue(op_0).concat(_descriptor_5.toValue(threshold_0)))),
            alignment: _descriptor_0.alignment().concat(_descriptor_4.alignment().concat(_descriptor_4.alignment().concat(_descriptor_5.alignment())))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = await this._proveField_0(context,
                                                  partialProofData,
                                                  record_id_0,
                                                  field_index_0,
                                                  op_0,
                                                  threshold_0);
        partialProofData.output = { value: [], alignment: [] };
        __compactRuntime.finalizeCallProofData(context, partialProofData);
        return { result: result_0, context: context, gasCost: context.callContext.currentGasCost };
      }
    };
    this.impureCircuits = {
      attest: this.circuits.attest,
      proveField: this.circuits.proveField
    };
    this.provableCircuits = {
      attest: this.circuits.attest,
      proveField: this.circuits.proveField
    };
  }
  async initialState(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialPrivateState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialPrivateState' in argument 1 (as invoked from Typescript)`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    state_0.data = new __compactRuntime.ChargedState(stateValue_0);
    state_0.setOperation('attest', new __compactRuntime.ContractOperation());
    state_0.setOperation('proveField', new __compactRuntime.ContractOperation());
    const context = __compactRuntime.createCircuitContext({circuitId: 'constructor', contractAddress: __compactRuntime.dummyContractAddress(), coinPublicKeyOrZswapState: constructorContext_0.initialZswapLocalState.coinPublicKey, contractState: state_0.data, privateState: constructorContext_0.initialPrivateState});
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(0n),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(1n),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(2n),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(0n),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    state_0.data = new __compactRuntime.ChargedState(context.callContext.currentQueryContext.state.state);
    return {
      currentContractState: state_0,
      currentPrivateState: context.callContext.currentPrivateState,
      currentZswapLocalState: context.callContext.currentZswapLocalState
    }
  }
  _transientHash_0(value_0) {
    const result_0 = __compactRuntime.transientHash(_descriptor_0, value_0);
    return result_0;
  }
  _transientHash_1(value_0) {
    const result_0 = __compactRuntime.transientHash(_descriptor_10, value_0);
    return result_0;
  }
  _transientHash_2(value_0) {
    const result_0 = __compactRuntime.transientHash(_descriptor_8, value_0);
    return result_0;
  }
  _upgradeFromTransient_0(x_0) {
    const result_0 = __compactRuntime.upgradeFromTransient(x_0);
    return result_0;
  }
  _local_secret_key_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.callContext.currentQueryContext.state), context.callContext.currentPrivateState, context.callContext.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.local_secret_key(witnessContext_0);
    context.callContext.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('local_secret_key',
                                 'return value',
                                 'mini-vault.compact line 51 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
    });
    return result_0;
  }
  _record_values_0(context, partialProofData, record_id_0) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.callContext.currentQueryContext.state), context.callContext.currentPrivateState, context.callContext.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.record_values(witnessContext_0,
                                                                        record_id_0);
    context.callContext.currentPrivateState = nextPrivateState_0;
    if (!(Array.isArray(result_0) && result_0.length === 4 && result_0.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 18446744073709551615n))) {
      __compactRuntime.typeError('record_values',
                                 'return value',
                                 'mini-vault.compact line 52 char 1',
                                 'Vector<4, Uint<0..18446744073709551616>>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_7.toValue(result_0),
      alignment: _descriptor_7.alignment()
    });
    return result_0;
  }
  _record_salt_0(context, partialProofData, record_id_0) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.callContext.currentQueryContext.state), context.callContext.currentPrivateState, context.callContext.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.record_salt(witnessContext_0,
                                                                      record_id_0);
    context.callContext.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('record_salt',
                                 'return value',
                                 'mini-vault.compact line 53 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
    });
    return result_0;
  }
  _ownerIdOf_0(secret_0) {
    return this._upgradeFromTransient_0(this._transientHash_0(secret_0));
  }
  _commitmentOf_0(values_0, salt_0) {
    return this._upgradeFromTransient_0(this._transientHash_1({ tag: 1n,
                                                                v0: values_0[0],
                                                                v1: values_0[1],
                                                                v2: values_0[2],
                                                                v3: values_0[3],
                                                                salt: salt_0 }));
  }
  _claimKeyOf_0(record_id_0, commitment_0, field_index_0, op_0, threshold_0) {
    return this._upgradeFromTransient_0(this._transientHash_2({ tag: 2n,
                                                                record_id:
                                                                  record_id_0,
                                                                commitment:
                                                                  commitment_0,
                                                                field_index:
                                                                  field_index_0,
                                                                op: op_0,
                                                                threshold:
                                                                  threshold_0 }));
  }
  _pick_0(values_0, field_index_0) {
    if (field_index_0 === 0n) {
      return values_0[0];
    } else {
      if (field_index_0 === 1n) {
        return values_0[1];
      } else {
        if (field_index_0 === 2n) {
          return values_0[2];
        } else {
          return values_0[3];
        }
      }
    }
  }
  async _caller_id_0(context, partialProofData) {
    return this._ownerIdOf_0(this._local_secret_key_0(context, partialProofData));
  }
  async _attest_0(context, partialProofData, record_id_0) {
    const id_0 = record_id_0;
    __compactRuntime.assert(!_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_4.toValue(0n),
                                                                                                                   alignment: _descriptor_4.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(id_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'record already attested');
    const commitment_0 = this._commitmentOf_0(this._record_values_0(context,
                                                                    partialProofData,
                                                                    record_id_0),
                                              this._record_salt_0(context,
                                                                  partialProofData,
                                                                  record_id_0));
    const tmp_0 = { owner: await this._caller_id_0(context, partialProofData),
                    commitment: commitment_0 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_4.toValue(0n),
                                                                  alignment: _descriptor_4.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(id_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tmp_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_1 = 1n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_4.toValue(2n),
                                                                  alignment: _descriptor_4.alignment() } }] } },
                                       { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                              { value: _descriptor_3.toValue(tmp_1),
                                                                alignment: _descriptor_3.alignment() }
                                                                .value
                                                            )) } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  async _proveField_0(context,
                      partialProofData,
                      record_id_0,
                      field_index_0,
                      op_0,
                      threshold_0)
  {
    const id_0 = record_id_0;
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_4.toValue(0n),
                                                                                                                  alignment: _descriptor_4.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(id_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'no attestation for this record');
    const attestation_0 = _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                    partialProofData,
                                                                                    [
                                                                                     { dup: { n: 0 } },
                                                                                     { idx: { cached: false,
                                                                                              pushPath: false,
                                                                                              path: [
                                                                                                     { tag: 'value',
                                                                                                       value: { value: _descriptor_4.toValue(0n),
                                                                                                                alignment: _descriptor_4.alignment() } }] } },
                                                                                     { idx: { cached: false,
                                                                                              pushPath: false,
                                                                                              path: [
                                                                                                     { tag: 'value',
                                                                                                       value: { value: _descriptor_0.toValue(id_0),
                                                                                                                alignment: _descriptor_0.alignment() } }] } },
                                                                                     { popeq: { cached: false,
                                                                                                result: undefined } }]).value);
    __compactRuntime.assert(this._equal_0(attestation_0.owner,
                                          await this._caller_id_0(context,
                                                                  partialProofData)),
                            'only the attester can prove');
    __compactRuntime.assert(field_index_0 <= 3n, 'field index out of range');
    __compactRuntime.assert(op_0 <= 1n, 'op out of range');
    const values_0 = this._record_values_0(context,
                                           partialProofData,
                                           record_id_0);
    __compactRuntime.assert(this._equal_1(this._commitmentOf_0(values_0,
                                                               this._record_salt_0(context,
                                                                                   partialProofData,
                                                                                   record_id_0)),
                                          attestation_0.commitment),
                            'values do not match the attestation');
    const value_0 = this._pick_0(values_0, field_index_0);
    if (op_0 === 0n) {
      __compactRuntime.assert(value_0 <= threshold_0, 'statement is false');
    } else {
      __compactRuntime.assert(value_0 >= threshold_0, 'statement is false');
    }
    const key_0 = this._claimKeyOf_0(record_id_0,
                                     attestation_0.commitment,
                                     field_index_0,
                                     op_0,
                                     threshold_0);
    const tmp_0 = { record_id: id_0,
                    field_index: field_index_0,
                    op: op_0,
                    threshold: threshold_0 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_4.toValue(1n),
                                                                  alignment: _descriptor_4.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(tmp_0),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _equal_0(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_1(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
}
export function ledger(stateOrChargedState) {
  const state = stateOrChargedState instanceof __compactRuntime.StateValue ? stateOrChargedState : stateOrChargedState.state;
  const chargedState = stateOrChargedState instanceof __compactRuntime.StateValue ? new __compactRuntime.ChargedState(stateOrChargedState) : stateOrChargedState;
  const context = {
    callContext: { currentQueryContext: new __compactRuntime.QueryContext(chargedState, __compactRuntime.dummyContractAddress()), currentGasCost: __compactRuntime.emptyRunningCost() },
    costModel: __compactRuntime.CostModel.initialCostModel()
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    attestations: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_4.toValue(0n),
                                                                                                     alignment: _descriptor_4.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(0n),
                                                                                                                                 alignment: _descriptor_5.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_4.toValue(0n),
                                                                                                     alignment: _descriptor_4.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'mini-vault.compact line 25 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_4.toValue(0n),
                                                                                                     alignment: _descriptor_4.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'mini-vault.compact line 25 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_4.toValue(0n),
                                                                                                     alignment: _descriptor_4.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_0.toValue(key_0),
                                                                                                     alignment: _descriptor_0.alignment() } }] } },
                                                                          { popeq: { cached: false,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[0];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_1.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    claims: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_4.toValue(1n),
                                                                                                     alignment: _descriptor_4.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(0n),
                                                                                                                                 alignment: _descriptor_5.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_4.toValue(1n),
                                                                                                     alignment: _descriptor_4.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'mini-vault.compact line 26 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_4.toValue(1n),
                                                                                                     alignment: _descriptor_4.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'mini-vault.compact line 26 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_4.toValue(1n),
                                                                                                     alignment: _descriptor_4.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_0.toValue(key_0),
                                                                                                     alignment: _descriptor_0.alignment() } }] } },
                                                                          { popeq: { cached: false,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_6.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    get attested() {
      return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_4.toValue(2n),
                                                                                                   alignment: _descriptor_4.alignment() } }] } },
                                                                        { popeq: { cached: true,
                                                                                   result: undefined } }]).value);
    }
  };
}
const _emptyContext = {
  callContext: { currentQueryContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress()), currentGasCost: __compactRuntime.emptyRunningCost() }
};
const _dummyContract = new Contract({
  local_secret_key: (...args) => undefined,
  record_values: (...args) => undefined,
  record_salt: (...args) => undefined
});
export const pureCircuits = {
  ownerIdOf: (...args_0) => {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`ownerIdOf: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const secret_0 = args_0[0];
    if (!(secret_0.buffer instanceof ArrayBuffer && secret_0.BYTES_PER_ELEMENT === 1 && secret_0.length === 32)) {
      __compactRuntime.typeError('ownerIdOf',
                                 'argument 1',
                                 'mini-vault.compact line 62 char 1',
                                 'Bytes<32>',
                                 secret_0)
    }
    return _dummyContract._ownerIdOf_0(secret_0);
  },
  commitmentOf: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`commitmentOf: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const values_0 = args_0[0];
    const salt_0 = args_0[1];
    if (!(Array.isArray(values_0) && values_0.length === 4 && values_0.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 18446744073709551615n))) {
      __compactRuntime.typeError('commitmentOf',
                                 'argument 1',
                                 'mini-vault.compact line 67 char 1',
                                 'Vector<4, Uint<0..18446744073709551616>>',
                                 values_0)
    }
    if (!(salt_0.buffer instanceof ArrayBuffer && salt_0.BYTES_PER_ELEMENT === 1 && salt_0.length === 32)) {
      __compactRuntime.typeError('commitmentOf',
                                 'argument 2',
                                 'mini-vault.compact line 67 char 1',
                                 'Bytes<32>',
                                 salt_0)
    }
    return _dummyContract._commitmentOf_0(values_0, salt_0);
  },
  claimKeyOf: (...args_0) => {
    if (args_0.length !== 5) {
      throw new __compactRuntime.CompactError(`claimKeyOf: expected 5 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const record_id_0 = args_0[0];
    const commitment_0 = args_0[1];
    const field_index_0 = args_0[2];
    const op_0 = args_0[3];
    const threshold_0 = args_0[4];
    if (!(record_id_0.buffer instanceof ArrayBuffer && record_id_0.BYTES_PER_ELEMENT === 1 && record_id_0.length === 32)) {
      __compactRuntime.typeError('claimKeyOf',
                                 'argument 1',
                                 'mini-vault.compact line 79 char 1',
                                 'Bytes<32>',
                                 record_id_0)
    }
    if (!(commitment_0.buffer instanceof ArrayBuffer && commitment_0.BYTES_PER_ELEMENT === 1 && commitment_0.length === 32)) {
      __compactRuntime.typeError('claimKeyOf',
                                 'argument 2',
                                 'mini-vault.compact line 79 char 1',
                                 'Bytes<32>',
                                 commitment_0)
    }
    if (!(typeof(field_index_0) === 'bigint' && field_index_0 >= 0n && field_index_0 <= 255n)) {
      __compactRuntime.typeError('claimKeyOf',
                                 'argument 3',
                                 'mini-vault.compact line 79 char 1',
                                 'Uint<0..256>',
                                 field_index_0)
    }
    if (!(typeof(op_0) === 'bigint' && op_0 >= 0n && op_0 <= 255n)) {
      __compactRuntime.typeError('claimKeyOf',
                                 'argument 4',
                                 'mini-vault.compact line 79 char 1',
                                 'Uint<0..256>',
                                 op_0)
    }
    if (!(typeof(threshold_0) === 'bigint' && threshold_0 >= 0n && threshold_0 <= 18446744073709551615n)) {
      __compactRuntime.typeError('claimKeyOf',
                                 'argument 5',
                                 'mini-vault.compact line 79 char 1',
                                 'Uint<0..18446744073709551616>',
                                 threshold_0)
    }
    return _dummyContract._claimKeyOf_0(record_id_0,
                                        commitment_0,
                                        field_index_0,
                                        op_0,
                                        threshold_0);
  }
};
export const expectedVk = {
  'attest': 'b93167bb7cfa0a8492bc94af1f4292d9e97391c88470d5dc0ebf99f72a57d141',
  'proveField': '9ccf7d9cfe933b308ece054e0e022a86950bd0f5f4ddd6c889afbbc87b14d012',
};

export const circuitSignatures = {
  'ownerIdOf': {pure: true, provable: false, argumentTypes: [{tag: 'Bytes', length: 32}], resultType: {tag: 'Bytes', length: 32}},
  'commitmentOf': {pure: true, provable: false, argumentTypes: [{tag: 'Vector', length: 4, type: {tag: 'Uint', maxval: '18446744073709551615'}}, {tag: 'Bytes', length: 32}], resultType: {tag: 'Bytes', length: 32}},
  'claimKeyOf': {pure: true, provable: false, argumentTypes: [{tag: 'Bytes', length: 32}, {tag: 'Bytes', length: 32}, {tag: 'Uint', maxval: '255'}, {tag: 'Uint', maxval: '255'}, {tag: 'Uint', maxval: '18446744073709551615'}], resultType: {tag: 'Bytes', length: 32}},
  'attest': {pure: false, provable: true, argumentTypes: [{tag: 'Bytes', length: 32}], resultType: {tag: 'Tuple', types: []}},
  'proveField': {pure: false, provable: true, argumentTypes: [{tag: 'Bytes', length: 32}, {tag: 'Uint', maxval: '255'}, {tag: 'Uint', maxval: '255'}, {tag: 'Uint', maxval: '18446744073709551615'}], resultType: {tag: 'Tuple', types: []}},
};

export const declaredInterfaces = {};

//# sourceMappingURL=index.js.map

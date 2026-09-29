export default class TweakpaneUI {
   constructor({
    pane,
    onToggleEditMode,
    onPlaceAsset,
    onSaveAssets
  }) {
    this.pane = pane
    this.onToggleEditMode = onToggleEditMode
    this.onPlaceAsset = onPlaceAsset
    this.onSaveAssets = onSaveAssets

    this._controls = {}

    this._create()
  }

  _create() {
    if (!this.pane) return

    try {
      this.assetsfolder = this.pane.addFolder({ title: '에셋', expanded: false })
      this.signsFolder = this.assetsfolder.addFolder({ title: '표지판', expanded: false })
      this.editParam = { editMode: false }

      // 편집 모드 토글 바인딩
      const binding = this.pane.addBinding(this.editParam, 'editMode', { label: '편집 모드' })
      this._controls.binding = binding
      // 핸들러를 저장해 나중에 정리할 수 있도록 한다
      this._controls.onBindingChange = ev => this.onToggleEditMode?.(ev.value)
      binding.on('change', this._controls.onBindingChange)

      const makePlaceBtn = (folder, title, type) => {
        const btn = folder.addButton({ title })
        const handler = () => {
          if (type === 'cargoZone' && this._controls.cargoZoneLocked) return
          this.onPlaceAsset?.(type)
        }
        btn.on('click', handler)
        return { btn, handler, type }
      }

      this._controls.placingButtons = []

      this._controls.placingButtons.push(makePlaceBtn(this.assetsfolder, '콘', 'cone'))
      this._controls.placingButtons.push(makePlaceBtn(this.assetsfolder, '배럴', 'barrel'))
      this._controls.placingButtons.push(makePlaceBtn(this.assetsfolder, '경사로', 'ramp'))
      this._controls.placingButtons.push(makePlaceBtn(this.assetsfolder, '과속방지턱', 'bump'))
      this._controls.placingButtons.push(makePlaceBtn(this.assetsfolder, '콘크리트 방호벽', 'barrier'))
      this._controls.placingButtons.push(makePlaceBtn(this.assetsfolder, '타이어', 'tire'))

      // 표지판
      this._controls.placingButtons.push(makePlaceBtn(this.signsFolder, '전방 표지판', 'signAhead'))
      this._controls.placingButtons.push(makePlaceBtn(this.signsFolder, '정지 표지판', 'signStop'))
      this._controls.placingButtons.push(makePlaceBtn(this.signsFolder, '주의 표지판', 'signWarning'))
      this._controls.placingButtons.push(makePlaceBtn(this.signsFolder, '진입금지 표지판', 'signNot'))

      // 구역
      this._controls.placingButtons.push(makePlaceBtn(this.assetsfolder, '화물 구역', 'cargoZone'))

      // 저장 버튼
      this._controls.save = {}
      const saveBtn = this.assetsfolder.addButton({ title: '에셋 저장' })
      this._controls.save.handler = () => {
        this.onSaveAssets?.()
      }
      saveBtn.on('click', this._controls.save.handler)
      this._controls.save.btn = saveBtn

      // 시각적 상태 초기화
      this.updateState(false)
    } catch (e) {
      // Tweakpane이 없으면 경고를 저장하고 계속 진행한다
      // 초기화를 깨뜨리지 않도록 에러를 던지지 않는다
      console.warn('[TweakpaneUI] Tweakpane을 사용할 수 없음:', e)
    }
  }

  updateState(isEditing) {
    try {
      const el = this.assetsfolder?.element
      if (el) {
        el.style.opacity = isEditing ? '1' : '0.5'
        el.style.pointerEvents = isEditing ? 'auto' : 'none'
      }

      if (this.editParam) {
        this.editParam.editMode = !!isEditing
        this._controls.binding?.refresh?.()
      }

    } catch (e) {
      // 조용히 무시
    }
  }

  setPlaceAssetEnabled(type, enabled) {
    const item = this._controls.placingButtons?.find(b => b.type === type)
    if (!item) return

    item.enabled = enabled

    if ('disabled' in item.btn) {
      item.btn.disabled = !enabled
    }

    const el =
      item.btn?.element ||
      item.btn?.controller?.view?.element ||
      item.btn?.controller?.view?.labelElement

    if (el) {
      el.style.opacity = enabled ? '1' : '0.45'
      el.style.pointerEvents = enabled ? 'auto' : 'none'
      el.style.filter = enabled ? '' : 'grayscale(1)'
    }
  }

  dispose() {
    // 핸들러 정리를 시도한다. Tweakpane 버전에 따라 off() 동작이 다를 수 있으므로 기본만 수행한다.
    try {
      if (this._controls?.binding && this._controls?.onBindingChange) {
        this._controls.binding.off?.('change', this._controls.onBindingChange)
      }

      if (this._controls?.placingButtons) {
        for (const item of this._controls.placingButtons) {
          item.btn?.off?.('click', item.handler)
        }
      }

      if (this._controls?.save?.btn && this._controls?.save?.handler) {
        this._controls.save.btn?.off?.('click', this._controls.save.handler)
      }

      // 다른 동작을 깨뜨리지 않기 위해 pane에서 폴더를 제거하지는 않는다.
    } catch (e) {
      // 치명적이지 않음
    }
  }
}